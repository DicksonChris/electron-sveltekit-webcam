<script>
  import POForm from "$lib/POForm.svelte";
  import DummyMultiWebcam from "$lib/DummyMultiWebcam.svelte";
  export let data
</script>

<div class="prose mb-4">
  <h1>{data.order}</h1>
</div>
<div class="grid grid-cols-2 gap-4" style="grid-template-columns: 1fr 1fr;">
  <POForm />
  <DummyMultiWebcam />
</div>
