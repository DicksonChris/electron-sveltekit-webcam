<script lang="ts">
  import {  getImage } from '$lib/imageViewer/utils'
  import { imagesList, imageIndex, updateImageIndex } from '$lib/imageViewer/store'

  function nextImage() {
    // Use the custom function to update the imageIndex by 1
    updateImageIndex(1)

    // Set the image buffer for the new index
    let list: string[] | null = []
    let index = 0
    imagesList.subscribe(value => {
      list = value
    })()
    imageIndex.subscribe(value => {
      index = value
    })()
    if (list && list.length > 0) {
      getImage(list[index])
    }
  }

  function prevImage() {
    // Use the custom function to update the imageIndex by -1
    updateImageIndex(-1)

    // Set the image buffer for the new index
    let list: string[] | null = []
    let index = 0
    imagesList.subscribe(value => {
      list = value
    })()
    imageIndex.subscribe(value => {
      index = value
    })()
    if (list && list.length > 0) {
      getImage(list[index])
    }
  }
</script>

{#if $imagesList && $imagesList.length > 0}
  <div class="flex justify-center items-center space-x-4">
    <button class="btn btn-outline btn-primary" on:click={prevImage}>Previous</button>
    <button class="btn btn-outline" on:click={nextImage}>Next</button>
  </div>
{/if}