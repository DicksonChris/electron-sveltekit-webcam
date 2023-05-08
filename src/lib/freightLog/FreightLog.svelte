<script lang="ts">
	import { onMount } from 'svelte'
	import placeholder from '$lib/placeholder_freight_log.jpg'
	import ImageViewer from '$lib/imageViewer/ImageViewer.svelte'
	import ScanWrapper from '$lib/freightLog/ScanWrapper.svelte'
	import { scanFreightLog, scanAdditionalFreightLog } from '$lib/freightLog/scan'
	import { isScanningStore, totalPages, existsAlready } from '$lib/freightLog/store'
	import ScanConsole from './ScanConsole.svelte'
	import { derived } from 'svelte/store'
	import { setPoNumber } from '$lib/orderState/store'
	import ImageButtons from '$lib/imageViewer/ImageButtons.svelte'

	let filename = ''
	let currentImage = placeholder
	const scanCompleted = derived(
		[isScanningStore, totalPages],
		([$isScanningStore, $totalPages]) => !$isScanningStore && $totalPages !== null
	)

	$: if ($scanCompleted || true) {
		setPoNumber(filename)
	}

	function resetStore() {
		isScanningStore.set(false)
		totalPages.set(null)
		existsAlready.set(false)
		setPoNumber('')
	}

	onMount(() => {
		resetStore()
	})
</script>

<div class="flex bg-pattern min-h-custom">
	<div class="flex flex-col bg-gray-100 p-4 border-r-[1px] border-gray-300 shadow-lg">
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

		{#if $existsAlready}
			<button
				class="btn {$isScanningStore || !filename ? 'btn-disabled' : 'btn-warning'}"
				on:click={() => scanAdditionalFreightLog(filename)}
				disabled={$isScanningStore || !filename}>Scan More</button
			>
		{:else}
			<button
				class="btn {$isScanningStore || !filename ? 'btn-disabled' : 'btn-primary'}"
				on:click={() => scanFreightLog(filename)}
				disabled={$isScanningStore || !filename}>Scan freight log</button
			>
		{/if}
		{#if $scanCompleted}
			<a href="takePhotos" class="btn btn-primary">Continue</a>
		{/if}

		<ImageButtons {filename} />
		<ScanConsole />

		<a href="takePhotos" class="btn btn-primary btn-outline">temp Continue</a>
	</div>

	<div class="h-full mt-8 mb-4 mx-auto">
		<div class="px-4">
			{#if $scanCompleted}
				<ScanWrapper>
					<ImageViewer {filename} />
				</ScanWrapper>
			{:else}
				<ScanWrapper>
					<img src={currentImage} alt="" width="640px" />
				</ScanWrapper>
			{/if}
		</div>
	</div>
</div>

<style>
	.bg-pattern {
		background-color: #f3f2f0;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='p' width='100' height='100' patternUnits='userSpaceOnUse' patternTransform='scale(0.21)'%3E%3Cpath id='a' data-color='fill' fill='%23FFFFFF' stroke='%23FFFFFF' stroke-width='9.24' d='M0 50V0h50zM50 50V0h50zM0 100V50h50zM50 100V50h50z'%3E%3C/path%3E%3Cuse xlink:href='%23a' x='100'%3E%3C/use%3E%3Cuse xlink:href='%23a' y='100'%3E%3C/use%3E%3Cuse xlink:href='%23a' x='100' y='100'%3E%3C/use%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23p)' width='100%25' height='100%25'%3E%3C/rect%3E%3C/svg%3E");
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.min-h-custom {
		min-height: calc(100vh - 59px);
	}
</style>
