<script>
  const fileSystemAPI = window.bridge.FileSystem
  import placeholder from '$lib/placeholder_freight_log.jpg'
  import scanned from '$lib/scanned_log.jpg'

  let filename = ''
  let output = ''
  let error = ''
  let scanning = false

  const redLines = ['No pages are in the feeder.']
  const greenLines = ['Beginning scan', 'Scanned page', 'Exporting image', 'Finished saving images']

  function scanFreightLog() {
    output = '' // clear the output
    error = '' // clear the error
    fileSystemAPI.scanImage(filename)
    scanning = true
  }

  fileSystemAPI.onScanMessage('scanOutput', (event, data) => {
    output += data + '\n'
    // TODO: Don't actually know what the last line of the output is
    if (data.includes('Finished saving images')) {
      scanning = false
    } else if (data.includes('No pages are in the feeder.')) {
      scanning = false
    }
  })

  fileSystemAPI.onScanMessage('scanError', (event, data) => {
    error += data + '\n'
    if (data.includes('The selected scanner is busy')) {
      scanning = false // set scanning to false when error
    }
  })

  let currentImage = placeholder

  $: formattedOutput = output
    .split('\n')
    .map((line) => {
      let color = 'black'
      if (redLines.some((redLine) => line.includes(redLine))) {
        color = 'red'
      } else if (greenLines.some((greenLine) => line.includes(greenLine))) {
        color = 'green'
      }
      return `<p style="color: ${color};">${line}</p>`
    })
    .join('')
</script>

<div class="flex gap-2 mx-auto">
  <div class="flex flex-col gap-2 max-w-[40vh]">
    <label for="filename">Enter PO #:</label><br />
    <input
      name="filename"
      type="text"
      bind:value={filename}
      placeholder="PO #"
      class="border-2 border-gray-300 p-2 rounded-md"
    />
    <div id="output" class="font-mono">{@html formattedOutput}</div>
    <div id="error" class="font-mono text-orange-400">{@html error}</div>
    <a href="takePhotos" class="btn btn-primary">tempContinue</a>
  </div>
  <div class="flex flex-col gap-2 max-w-[40vh]">
    <img src={currentImage} alt="" />
    <button
      class="btn {scanning ? 'btn-disabled' : 'btn-primary'}"
      on:click={scanFreightLog}
      disabled={scanning}>Scan freight log</button
    >
    <!-- {#if currentImage === scanned}
      <a href="takePhotos" class="btn btn-primary">Continue</a>
    {/if} -->
  </div>
</div>
