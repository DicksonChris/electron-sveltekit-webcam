<script>
  import { onMount } from 'svelte'
  import { bridge } from 'electron'

  let webcams = []

  const startWebcamStream = (webcamDevice) => {
    const constraints = {
      audio: false,
      video: {
        advanced: [{ deviceId: webcamDevice.deviceId }, { width: 3264 }, { height: 2448 }],
      },
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        webcams = [
          ...webcams,
          {
            device: webcamDevice,
            stream,
          },
        ]
      })
      .catch((error) => console.error(error))
  }

  onMount(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) =>
        devices.filter(
          (device) => device.kind === 'videoinput' && device.label.includes('0c45:6366')
        )
      )
      .then((webcamDevices) =>
        webcamDevices
          .sort((a, b) => a.deviceId.localeCompare(b.deviceId))
          .forEach((webcamDevice) => startWebcamStream(webcamDevice))
      )
  })

  function srcObject(node, stream) {
    node.srcObject = stream
    return {
      update(stream) {
        node.srcObject = stream
      },
    }
  }

  const captureImage = async (stream) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    video.onloadedmetadata = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          bridge.saveImage(reader.result);
        };
        reader.readAsArrayBuffer(blob);
      }, 'image/jpeg');
    }
  }
</script>

<div id="right">
  {#each webcams as webcam}
    <div>
      LABEL = "{webcam.device.label}"<br />
      ID = "{webcam.device.deviceId}"
    </div>
    <video autoplay={true} use:srcObject={webcam.stream} />
    <button on:click={() => captureImage(webcam.stream)}>Save image</button>
  {/each}
</div>
