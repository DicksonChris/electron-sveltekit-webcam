<script lang="ts">
	import TitleBar from '$lib/windowTitleBar/TitleBar.svelte'
</script>

<div class="window-wrapper .min-safe-h-screen flex flex-col bg-gray-100">
	<TitleBar />
	<main class="fixed top-8 overflow-auto offset w-full">
		<slot />
	</main>
</div>

<style>
	.min-safe-h-screen {
		/* equivalent to 100dvh in major browsers */
		min-height: calc(100vh - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0));
	}

	.offset {
		height: calc(100% - 2rem - 2px);
	}

	/* @supports (-webkit-touch-callout: none) {
		.min-safe-h-screen {
			for ios safari 15, safe-area-inset-bottom is 0, so a special fix apply here
			min-height: -webkit-fill-available;
		}
	} */
</style>
