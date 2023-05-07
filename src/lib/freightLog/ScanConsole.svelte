<script lang="ts">
	import { onMount } from 'svelte'
	import { formatOutput } from '$lib/freightLog/scan'
	import { output, error } from '$lib/freightLog/store'

	onMount(() => {
		output.set('')
		error.set('')
	})
</script>

<div id="output" class="font-mono">{@html formatOutput($output)}</div>
<div id="error" class="font-mono text-orange-400">{@html $error}</div>
