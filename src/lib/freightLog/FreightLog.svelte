<script lang="ts">
  import placeholder from '$lib/placeholder_freight_log.jpg'
  import ImageViewer from '$lib/imageViewer/ImageViewer.svelte'
  import { scanFreightLog } from '$lib/freightLog/scan'
  import { isScanningStore, totalPages } from '$lib/freightLog/store'
  import ScanConsole from './ScanConsole.svelte'
  import { derived } from 'svelte/store'

  let filename = ''
  let currentImage = placeholder

  const scanCompleted = derived(
    [isScanningStore, totalPages],
    ([$isScanningStore, $totalPages]) => !$isScanningStore && $totalPages !== null
  )
</script>

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
    {#if $scanCompleted}
      <ImageViewer {filename} />
      <button class="btn btn-primary">Continue</button>
    {:else}
      <img src={currentImage} alt="" />
    {/if}
    <a href="takePhotos" class="btn btn-primary">tempContinue</a>
  </div>
</div>
