<script lang="ts">
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

<div class="grid gap-2 max-h-screen mx-auto">
  <div class="flex flex-col gap-2 max-w-xl">
    <!-- Bind the src attribute to the current image --> 
    <img src={currentImage} alt="" />
    <!-- Add an onclick handler to call the handleScan function -->
    <button class="btn btn-primary" on:click={handleScan}>Scan freight log</button>
    <!-- Show a link to take photos only if the current image is scanned -->
    {#if currentImage === scanned}
      <a href="takePhotos" class="btn btn-primary">Continue</a>
    {/if}
  </div>
</div>
