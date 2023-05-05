<script lang="ts">
  import { createImageURL } from '$lib/imageViewer/utils'
  import { imageBuffer, imagesList, imageIndex } from '$lib/imageViewer/store'
  new Blob
</script>

{#if $imagesList && $imagesList.length > 0}
  <p>{$imageIndex + 1} of {$imagesList.length}</p>
  <img src={createImageURL($imageBuffer)} alt="" class="max-w-md max-h-md object-contain" />
{/if}