<script lang="ts">
  import image from '$lib/218-384x256.jpg'
  let webcams = [{}, {}, {}, {}]
</script>

<div class="flex flex-col gap-4">
<div class="grid grid-cols-2 gap-2">
  {#each webcams as webcam, idx}
    <div class="flex flex-col justify-around overflow-x-hidden">
      <section class="prose">
        <h2 class="mb-2">CAMERA {idx + 1}</h2>
        <p class="text-xs">device-id-1234</p>
      </section>
      <img src={image} width="100%" alt="" />
    </div>
  {/each}
</div>
<button class="btn btn-success" on:click={() => console.log('SAVED ')}>Save image</button>
</div>
