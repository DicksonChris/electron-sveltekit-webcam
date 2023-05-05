<script lang="ts">
  import MultiWebcam from '$lib/MultiWebcam.svelte'
  import POForm from "$lib/POForm.svelte";
	import FreightLog from "$lib/freightLog/FreightLog.svelte"
  import { page } from '$app/stores';
</script>

<div class="prose mb-4">
	<h1>New Order</h1>
</div>
<div class="grid grid-cols-2 gap-4" style="grid-template-columns: 1fr 1fr;">
  <POForm />
  <MultiWebcam />
  <!-- <DummyMultiWebcam /> -->
</div>