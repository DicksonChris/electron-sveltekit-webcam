<script>
  let poNumber = ''
  let palletNumber = ''
  let weight

  function signUp() {
    // add your sign up logic here
  }
</script>

<form class="space-y-4" on:submit|preventDefault={signUp}>
  <div>
    <label class="label">
      <span class="text-base label-text">PO #</span>
    </label>
    <input
      type="text"
      placeholder="PO #"
      bind:value={poNumber}
      class="w-full input input-bordered input-primary"
    />
  </div>
  <div>
    <label class="label">
      <span class="text-base label-text">Pallet #</span>
    </label>
    <input
      type="text"
      placeholder="Pallet #"
      bind:value={palletNumber}
      class="w-full input input-bordered input-primary"
    />
  </div>
  <div>
    <label class="label">
      <span class="text-base label-text">Weight</span>
    </label>
    <input
      type="number"
      placeholder="Weight"
      bind:value={weight}
      class="font-mono w-[66%] input input-bordered input-primary"
    />&nbsp;<span>Lbs</span>
  </div>
  <div>
    <button class="btn btn-block btn-primary" type="submit">Submit</button>
  </div>
</form>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
