<script lang="ts">
  const fileSystemAPI = window.bridge.FileSystem
  import placeholder from '$lib/placeholder_freight_log.jpg'
  import scanned from '$lib/scanned_log.jpg'
	import ImageViewer from '$lib/imageViewer/ImageViewer.svelte'
  import { scanFreightLog } from '$lib/freightLog/scan'
  import { output, error, isScanningStore } from '$lib/freightLog/store'
	import ScanConsole from './freightLog/ScanConsole.svelte'

  let filename = ''
  let currentImage = placeholder
</script>

<ImageViewer/>

<div class="flex gap-8 mx-auto">
  <div class="flex flex-col gap-8 max-w-[40vh]">
    <label for="filename">Enter PO #:</label>
    <input
      name="filename"
      type="text"
      required
      bind:value={filename}
      placeholder="PO #"
      class="input input-bordered"
    />
    <button
      class="btn {$isScanningStore || !filename ? 'btn-disabled' : 'btn-primary'}"
      on:click={() => scanFreightLog(filename)}
      disabled={$isScanningStore || !filename}>Scan freight log</button
    >
    <ScanConsole />
  </div>
  
  <div class="flex flex-col gap-8 max-w-[40vh]">
    <img src={currentImage} alt="" />
    <a href="takePhotos" class="btn btn-primary">tempContinue</a>
  </div>
</div>

