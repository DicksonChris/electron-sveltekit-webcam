<script lang="ts">
	import { onMount } from 'svelte'
	import { filterOutput, formatOutput } from '$lib/freightLog/scan'
	import { output, error } from '$lib/freightLog/store'

	export let filename = ''

	onMount(() => {
		output.set('')
		error.set('')
	})
</script>

<div id="output" class="font-mono">{@html formatOutput(filterOutput(filename, $output))}</div>
<div id="error" class="font-mono text-orange-400">{@html $error}</div>
