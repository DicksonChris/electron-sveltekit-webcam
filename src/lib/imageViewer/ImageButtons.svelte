<script lang="ts">
	import { imagesList, imageIndex } from '$lib/imageViewer/store'
	import { nextImage, prevImage, rotateImage, deleteImage, getImages, loadFirstImage } from '$lib/imageViewer/utils'
	import GiClockwiseRotation from 'svelte-icons/gi/GiClockwiseRotation.svelte'
	import MdDelete from 'svelte-icons/md/MdDelete.svelte'
	export let filename = ''
</script>

{#if $imagesList && $imagesList.length > 0}
	<div>
		<span>{$imageIndex + 1} of {$imagesList.length}</span>
		<div class="flex gap-1 justify-between min-w-max">
			<div>
				<button class="btn btn-primary btn-outline" on:click={() => rotateImage(filename)}>
					<div class="h-6 rotate-90">
						<GiClockwiseRotation />
					</div>
				</button>
				<!-- <button
					class="btn btn-primary btn-outline"
					on:click={() => {
						if ($imagesList) {
							deleteImage($imagesList[$imageIndex])
						}
					}}
				>
					<div class="h-6">
						<MdDelete />
					</div>
				</button> -->
			</div>
			<div>
				<button class="btn btn-primary btn-outline" on:click={prevImage}>Prev</button>
				<button class="btn btn-primary btn-outline" on:click={nextImage}>Next</button>
			</div>
		</div>
	</div>
{/if}
