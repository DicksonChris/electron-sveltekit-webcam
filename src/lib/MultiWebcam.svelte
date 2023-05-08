<script lang="ts">
  import { onMount } from 'svelte'
  import { poNumber, palletNumber } from "./orderState/store"

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
          (device) => device.kind === 'videoinput' && (device.label.includes('0c45:6366') || true) // TODO remove OR true
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

  function saveImage(webcam: Webcam) {
    // TODO: Instead of using a timestamp, prompt user to overwrite existing image in order to deal with users spam clicking the button or forgetting to change something
    const timestamp = new Date()
      .toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      })
      .replace(/[/:]/g, '_')
      .replace(/ /g, '-')
      .replace(/,/g, '_')
      
    const video = document.createElement('video')
    video.srcObject = webcam.stream
    video.play()

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0)

      canvas.toBlob((blob) => {
        const reader = new FileReader()
        reader.onload = () => {
          const name = `PO#-${$poNumber}__PALLET#-${$palletNumber}__CAMERA-${webcams.indexOf(webcam) + 1}`
          const data = {
            PO_NUMBER: $poNumber,
            PALLET_NUMBER: $palletNumber,
            name,
            timestamp,
            blob: reader.result,
          }
          fileSystemAPI.saveImage(data)
        }
        reader.readAsArrayBuffer(blob)
      }, 'image/jpeg')
    }
  }

  function saveImages() {
    webcams.forEach((webcam) => saveImage(webcam))
  }
</script>

<div class="flex flex-col gap-4">
  <div class="grid grid-cols-2 gap-2">
    {#each webcams as webcam, idx}
      <div class="flex flex-col justify-around overflow-x-hidden">
        <section class="prose">
          <h2 class="mb-2">CAMERA {idx + 1}</h2>
          <p class="text-xs">ID: {webcam.device.deviceId.replace(/[0-9]/g, '').slice(-4).toUpperCase()}</p>
        </section>
        <video autoplay={true} use:srcObject={webcam.stream} />
        <button class="btn btn-primary" on:click={() => saveImage(webcam)}>Save image</button>
      </div>
    {/each}
  </div>
  <button class="btn btn-success" on:click={saveImages}>Save All Images</button>
</div>
