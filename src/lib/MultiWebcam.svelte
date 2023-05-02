<script lang="ts">
  import { onMount } from 'svelte'
  const fileSystemAPI = window.bridge.FileSystem

  const CAMERA_RESOLUTION = {
    width: 3264,
    height: 2448,
  }
  type Webcam = { device: MediaDeviceInfo; stream: MediaStream }
  let webcams: Webcam[] = []

  const startWebcamStream = (webcamDevice: MediaDeviceInfo) => {
    const constraints = {
      audio: false,
      video: {
        advanced: [
          { deviceId: webcamDevice.deviceId },
          { width: CAMERA_RESOLUTION.width },
          { height: CAMERA_RESOLUTION.height },
        ],
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

  function srcObject(node: HTMLMediaElement, stream: MediaStream) {
    node.srcObject = stream
    return {
      update(stream: MediaStream) {
        stream
      },
    }
  }

  const captureImage = async (stream: MediaStream) => {
    const video = document.createElement('video')
    video.srcObject = stream
    video.play()

    video.onloadedmetadata = async () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0)

      canvas.toBlob((blob) => {
        const reader = new FileReader()
        reader.onload = () => {
          fileSystemAPI.saveImage(reader.result)
        }
        reader.readAsArrayBuffer(blob)
      }, 'image/jpeg')
    }
  }
</script>

<div class="flex flex-col gap-4">
  <div class="grid grid-cols-2 gap-2">
    {#each webcams as webcam, idx}
      <div class="flex flex-col justify-around overflow-x-hidden">
        <section class="prose">
          <h2 class="mb-2">CAMERA {idx + 1}</h2>
          <p class="text-xs">device-id-1234</p>
        </section>
        <video autoplay={true} use:srcObject={webcam.stream}
          ><track kind="captions" aria-hidden="true" /></video
        >
      </div>
    {/each}
  </div>
  <button class="btn btn-success" on:click={() => console.log('SAVED ')}>Save image</button>
</div>
