<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { createImageURL } from '$lib/imageViewer/utils'
  import { imageBuffer, imagesList, imageIndex } from '$lib/imageViewer/store'
  const dispatch = createEventDispatcher()

  export let filename: string

  function getImages(filename: string) {
    dispatch('get-images', { filename })
  }

  function getImage(filename: string) {
    dispatch('get-image', { filename })
  }

  // Call getImages when the component receives a filename
  $: if (filename) {
    getImages(filename)
  }

  // Subscribe to imagesList and getImage for each filename
  $: if ($imagesList && $imagesList.length > 0) {
    $imagesList.forEach((imageFilename) => {
      getImage(imageFilename)
    })
  }
</script>

{#if $imagesList && $imagesList.length > 0}
  <p>{$imageIndex + 1} of {$imagesList.length}</p>
  {#each $imagesList as imageFilename, index ($imageIndex === index)}
    {#if $imageIndex === index}
      <img src={createImageURL($imageBuffer)} alt="" class="max-w-md max-h-md object-contain" />
    {/if}
  {/each}
{/if}
