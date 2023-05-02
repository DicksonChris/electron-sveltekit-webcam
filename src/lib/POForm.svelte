<script lang="ts">
  let poNumber = ''
  let palletNumber
  let weight

  function increment() {
    palletNumber++
  }

  function decrement() {
    palletNumber--
  }

  function submitForm() {
    // add your sign up logic here
  }
</script>

<form class="space-y-4" on:submit|preventDefault={submitForm}>
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
    <div class="flex gap-4">
      <div>
        <input
          placeholder="Pallet #"
          type="number"
          bind:value={palletNumber}
          size="1"
          class="{!palletNumber || 'font-mono'} number-input w-48 input-pallet number-input-6rem"
        />
      </div>
      <div class="flex flex-col flex-1 gap-4">
        <button class="btn btn-primary flex-1 text-4xl" on:click={increment}>+</button>
        <button class="btn btn-primary flex-1 text-5xl" on:click={decrement}>{'-'}</button>
      </div>
    </div>
  </div>
  <div>
    <label class="label">
      <span class="text-base label-text">Weight</span>
    </label>
    <input
      type="number"
      placeholder="Weight"
      bind:value={weight}
      class="number-input {!weight ||'font-mono'} number-input w-60 input-pallet number-input-6rem"
    /><span class="font-bold text-2xl self-end">&nbsp;Lbs</span>
  </div>

  <div>
    <button class="btn btn-block btn-primary" type="submit">Submit</button>
  </div>
</form>

<style>
  :global(.number-input:not(:placeholder-shown)) {
    font-size: 2rem;
  }

  :global(.number-input-6rem:not(:placeholder-shown)) {
    font-size: 6rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }

  .input-pallet {
    flex-shrink: 1;
    height: 8rem /* 48px */;
    padding-left: 1rem /* 16px */;
    padding-right: 1rem /* 16px */;
    line-height: 1.25rem /* 20px */;
    line-height: 2;
    line-height: 1.5rem /* 24px */;
    border-width: 1px;
    border-color: hsl(var(--bc) / var(--tw-border-opacity));
    --tw-border-opacity: 0;
    --tw-bg-opacity: 1;
    background-color: hsl(var(--b1) / var(--tw-bg-opacity));
    border-radius: var(--rounded-btn, 0.5rem);
    --tw-border-opacity: 0.2;
    --tw-border-opacity: 1;
    border-color: hsl(var(--p) / var(--tw-border-opacity));
    box-sizing: border-box;
  }
  .input-pallet:focus {
    outline: 2px solid hsl(var(--p));
  }
</style>
