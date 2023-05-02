<script lang="ts">
  import { onMount } from 'svelte'

  // Declare a reactive array to store the webcam devices and streams
  let webcams = []

  // Define a function to start a webcam stream with a given device
  const startWebcamStream = (webcamDevice) => {
    const constraints: MediaStreamConstraints = {
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
      .catch((error) => {
        if (error.name === 'NotAllowedError') {
          console.warn('Access to camera is denied.')
        } else if (error.name === 'NotFoundError') {
          console.warn('No camera with the specified constraints was found.')
        } else {
          console.error(error)
        }
      })
  }

  onMount(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => devices.filter((device) => device.kind === 'videoinput'))
      .then((webcamDevices) =>
        webcamDevices.forEach((webcamDevice) => startWebcamStream(webcamDevice))
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

  const ids = ['fbd5c60da03194f27cc47ba0f8a7672b7de0f827c4630cc90f81ef812209d29a']

  const filterById = (webcam) => ids.includes(webcam.device.deviceId)

  let imageUrl = ''

  const captureImage = (stream) => {
    const video = document.createElement('video')
    video.srcObject = stream
    video.play()

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0)
      imageUrl = canvas.toDataURL('image/jpeg')

      // Create an anchor element
      const link = document.createElement('a')
      // Set its href attribute to the image URL
      link.href = imageUrl
      // Set the download attribute to specify the filename
      link.download = 'captured_image.jpg'
      // Append the link to the body
      document.body.appendChild(link)
      // Trigger a click event
      link.click()
      // Remove the link from the body
      document.body.removeChild(link)
    }
  }
</script>

<div id="right">
  {#each webcams.filter(filterById) as webcam}
    <div>
      LABEL = "{webcam.device.label}"<br />
      ID = "{webcam.device.deviceId}"
    </div>
    <video autoplay={true} use:srcObject={webcam.stream} />
    <button class="btn btn-primary" on:click={() => captureImage(webcam.stream)}>Save image</button>
  {/each}
  {#if imageUrl}
    <img src={imageUrl} alt="captured image" />
  {/if}
</div>
