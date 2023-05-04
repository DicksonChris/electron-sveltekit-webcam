<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { imagesList } from '$lib/imageViewer/store'
  const dispatch = createEventDispatcher()

  function nextImage() {
    dispatch('next-image')
  }

  function prevImage() {
    dispatch('prev-image')
  }
</script>

{#if $imagesList && $imagesList.length > 0}
  <div class="flex justify-center items-center space-x-4">
    <button class="btn btn-outline btn-primary" on:click={prevImage}>Previous</button>
    <button class="btn btn-outline" on:click={nextImage}>Next</button>
  </div>
{/if}