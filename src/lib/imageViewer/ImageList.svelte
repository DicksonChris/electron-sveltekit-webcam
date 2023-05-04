<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { createImageURL } from '$lib/imageViewer/utils'
  import { imageBuffer, imagesList, imageIndex } from '$lib/imageViewer/store'
  const dispatch = createEventDispatcher()

  function getImage(filename: string) {
    dispatch('get-image', { filename })
  }

  function getImages(filename: string) {
    dispatch('get-images', { filename })
  }
</script>

<button class="btn btn-primary" on:click={() => getImage('efg.jpg')}>Get Image</button>
{#if $imageBuffer}
  <img src={createImageURL($imageBuffer)} alt="Image" class="max-w-md max-h-md object-contain" />
{/if}
<button class="btn btn-secondary" on:click={() => getImages('abc')}>Get Images</button>
{#if $imagesList && $imagesList.length > 0}
  <p>{$imageIndex + 1} of {$imagesList.length}</p>
{/if}