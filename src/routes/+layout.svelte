<script lang="ts">
	import TitleBar from '$lib/windowTitleBar/TitleBar.svelte'
	import '../app.postcss'
	import { onMount } from 'svelte'

	let ready = false
	onMount(() => (ready = true))
</script>

{#if ready}
	<TitleBar>
		<main class="max-w-screen-sm mx-auto my-20 px-6">
			<slot />
		</main>
	</TitleBar>
{/if}
