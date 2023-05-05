<script lang="ts">
	import placeholder from '$lib/placeholder_freight_log.jpg'
	import ImageViewer from '$lib/imageViewer/ImageViewer.svelte'
	import { scanFreightLog } from '$lib/freightLog/scan'
	import { isScanningStore, totalPages, existsAlready } from '$lib/freightLog/store'
	import ScanConsole from './ScanConsole.svelte'
	import { derived } from 'svelte/store'
	import { setPoNumber } from '$lib/orderState/store'
	let filename = 'abc'
	let currentImage = placeholder
	const scanCompleted = derived(
		[isScanningStore, totalPages],
		([$isScanningStore, $totalPages]) => !$isScanningStore && $totalPages !== null
	)

	$: if ($existsAlready) {
		console.log('exists already')
	}

	$: if ($scanCompleted || true) {
		setPoNumber(filename)
	}
</script>

<div class="flex gap-8 mx-auto">
	<div class="flex flex-col gap-8 max-w-[40vh]">
		<label for="filename">Enter PO #:</label>
		<input
			id="filename"
			name="filename"
			type="text"
			required
			bind:value={filename}
			placeholder="PO #"
			class="input input-bordered"
		/>
		{#if $scanCompleted}
			<button class="btn btn-primary">Continue</button>
		{:else}
			<button
				class="btn {$isScanningStore || !filename ? 'btn-disabled' : 'btn-primary'}"
				on:click={() => scanFreightLog(filename)}
				disabled={$isScanningStore || !filename}>Scan freight log</button
			>
		{/if}

		<ScanConsole />
	</div>

	<div class="flex flex-col gap-8 max-w-[40vh]">
		{#if $scanCompleted}
			<ImageViewer {filename} />
		{:else}
			<img src={currentImage} alt="" />
		{/if}
		<a href="takePhotos" class="btn btn-primary btn-outline">temp Continue</a>
	</div>
</div>
