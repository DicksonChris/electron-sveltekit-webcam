<script lang="ts">
	import Dragbar from '$lib/windowTitleBar/Dragbar.svelte'
	import '../app.postcss'
	import { onMount } from 'svelte'

	let ready = false
	onMount(() => (ready = true))
</script>

{#if ready}
	<Dragbar>
		<main class="max-w-screen-sm mx-auto my-20 px-6">
			<slot />
		</main>
	</Dragbar>
{/if}
