<script lang="ts">
	import { imagesList, imageIndex } from '$lib/imageViewer/store'
	import { nextImage, prevImage, rotateImage } from '$lib/imageViewer/utils'
	import GiClockwiseRotation from 'svelte-icons/gi/GiClockwiseRotation.svelte'
	export let filename = ''
</script>

{#if $imagesList && $imagesList.length > 0}
	<div>
		<span>{$imageIndex + 1} of {$imagesList.length}</span>
		
		<button class="btn btn-primary btn-outline " on:click={() => rotateImage(filename)} >
			<div class="h-4">
				<GiClockwiseRotation />
			</div>
		</button>
		<button class="btn btn-primary btn-outline" on:click={prevImage}>Previous</button>
		<button class="btn btn-primary btn-outline" on:click={nextImage}>Next</button>
	</div>
{/if}
