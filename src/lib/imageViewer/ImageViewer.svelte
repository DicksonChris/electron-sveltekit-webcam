<script lang="ts">
  import ImageList from '$lib/imageViewer/ImageList.svelte'
  import ImageButtons from '$lib/imageViewer/ImageButtons.svelte'
  import { handleGetImage, handleGetImages, handleNextImage, handlePrevImage } from '$lib/imageViewer/utils'

</script>

<ImageList on:get-image={handleGetImage} on:get-images={handleGetImages} />
<ImageButtons on:next-image={handleNextImage} on:prev-image={handlePrevImage} />