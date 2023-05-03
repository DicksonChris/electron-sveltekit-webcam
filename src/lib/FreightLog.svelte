<!-- <script lang="ts">
  import placeholder from '$lib/placeholder_freight_log.jpg'
  import scanned from '$lib/scanned_log.jpg'

  // Define an async function that waits for 1 second and returns scanned image
  async function scanFreightLog() {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return scanned
  }

  // Define a reactive variable to store the current image
  let currentImage = placeholder

  // Define a function that calls the scanFreightLog function and updates the current image
  async function handleScan() {
    currentImage = await scanFreightLog()
  }
</script>

<div class="grid gap-2 mx-auto">
  <div class="flex flex-col gap-2 max-w-[40vh]">
    <img src={currentImage} alt="" />
    <button class="btn btn-primary" on:click={handleScan}>Scan freight log</button>
    {#if currentImage === scanned}
      <a href="takePhotos" class="btn btn-primary">Continue</a>
    {/if}
  </div>
</div> -->

<script>
  const fileSystemAPI = window.bridge.FileSystem
  let filename = ''
  let output = ''
  let error = ''

  function scanImage() {
    // send the filename to the main process
    fileSystemAPI.scanImage(filename)
    // clear the input field
    filename = ''
  }

  // listen for messages from the main process
  fileSystemAPI.onScanMessage('scanOutput', (event, data) => {
    // check and log the output in green or red colors
    const trimmedOutput = data.trim()
    let matchFound = checkAndLog(trimmedOutput, greenLines, 'green')
    if (!matchFound) {
      checkAndLog(trimmedOutput, redLines, 'red')
    }
  })

  fileSystemAPI.onScanMessage('scanError', (event, data) => {
    // check and log the error in green or red colors
    const trimmedError = data.trim()
    let matchFound = checkAndLog(trimmedError, greenLines, 'green')
    if (!matchFound) {
      checkAndLog(trimmedError, redLines, 'red')
    }
  })

  // define the lines to match for green or red colors
  const redLines = ['No pages are in the feeder.']
  const greenLines = [
    'Beginning scan',
    'Scanned page',
    'Exporting image',
    'Finished saving images',
  ]

  // define a function to check and log a message in a color
  function checkAndLog(message, lines, color) {
    let matchFound = lines.some((line) => {
      return message.includes(line)
    })
    if (matchFound) {
      // append the message to the output or error variable with a span element of the color
      if (color === 'green') {
        output += `<span class="text-green-500">${message}</span>\n`
      } else if (color === 'red') {
        error += `<span class="text-red-500">${message}</span>\n`
      }
    }
    return matchFound
  }
</script>

<input type="text" bind:value={filename} placeholder="Enter filename" class="border-2 border-gray-300 p-2 rounded-md" />
<button on:click={scanImage} class="bg-blue-500 text-white p-2 rounded-md">Scan image</button>
<div id="output" class="font-mono">{@html output}</div>
<div id="error" class="font-mono">{@html error}</div>
<a href="takePhotos" class="btn btn-primary">Continue</a>