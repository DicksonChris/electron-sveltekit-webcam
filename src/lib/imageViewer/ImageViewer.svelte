<script lang="ts">
  import ImageList from '$lib/imageViewer/ImageList.svelte'
  import { getImages, loadFirstImage } from '$lib/imageViewer/utils'

  export let filename: string

  $: if (filename) {
    getImages(filename, loadFirstImage)
  }
</script>

<ImageList />