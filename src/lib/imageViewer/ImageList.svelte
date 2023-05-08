<script lang="ts">
  import { createImageURL } from '$lib/imageViewer/utils'
  import { imageBuffer, imagesList } from '$lib/imageViewer/store'
  new Blob
</script>

{#if $imagesList && $imagesList.length > 0}
  <img src={createImageURL($imageBuffer)} alt="" width=640 />
{/if}