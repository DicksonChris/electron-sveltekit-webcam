<script lang="ts">
  import { formatOutput } from '$lib/freightLog/scan'
  import { output, error } from '$lib/freightLog/store'
</script>

<div id="output" class="font-mono">{@html formatOutput($output)}</div>
<div id="error" class="font-mono text-orange-400">{@html $error}</div>