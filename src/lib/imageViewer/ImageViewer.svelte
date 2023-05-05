<script lang="ts">
  import ImageList from '$lib/imageViewer/ImageList.svelte'
  import ImageButtons from '$lib/imageViewer/ImageButtons.svelte'
  import { getImages, loadFirstImage } from '$lib/imageViewer/utils'

  export let filename: string

  $: if (filename) {
    getImages(filename, loadFirstImage)
  }
</script>

<ImageList />
<ImageButtons />