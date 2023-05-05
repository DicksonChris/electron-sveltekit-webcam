<script lang="ts">
	import { poNumber } from '$lib/orderState/store.js'

  // If PO exists check for information existing in database
	let po = $poNumber
	let palletNumber
	let weight

	function increment() {
		if (!palletNumber) {
			palletNumber = 1
		} else {
			palletNumber++
		}
	}

	function decrement() {
		palletNumber--
	}

	function submitForm() {
		// add your sign up logic here
	}
</script>

<form on:submit|preventDefault={submitForm} class="p-4 bg-gray-100">
	<div class="form-control">
		<label for="filename" class="label">Enter PO #:</label>
		<input
			id="filename"
			name="filename"
			type="text"
			required
			bind:value={po}
			placeholder="PO #"
			class="input input-bordered"
		/>
	</div>
	<div class="form-control">
		<label for="pallet" class="label">Pallet #:</label>
		<div class="flex items-center justify-center">
			<input
				id="pallet"
				name="pallet"
				type="number"
				bind:value={palletNumber}
				placeholder="Pallet #"
				class="input input-bordered pallet-input"
			/>
			<div class="flex flex-col ml-4 gap-2">
				<button type="button" on:click={increment} class="btn btn-primary btn-outline pallet-button"
					>+</button
				>
				<button type="button" on:click={decrement} class="btn btn-primary btn-outline pallet-button"
					>-</button
				>
			</div>
		</div>
	</div>
	<div class="form-control">
		<label for="weight" class="label">Weight:</label>
		<div class="flex items-center">
			<input
				id="weight"
				name="weight"
				type="number"
				bind:value={weight}
				placeholder="Weight"
				class="input input-bordered flex-1 mr-2 weight-input"
			/><span>Lbs</span>
		</div>
	</div>
	<div class="form-control mt-4">
		<button type="submit" class="btn btn-primary">Submit</button>
	</div>
</form>

<style>
	form {
		max-width: 600px;
		margin: 0 auto;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		appearance: none;
		margin: 0;
	}

	input[type='number'] {
		text-align: center;
	}

  .weight-input {
    text-align: right
  }

	.pallet-input, 
  .weight-input {
		width: 6rem;
		height: 6.5rem;
		font-size: 4rem;
		font-family: monospace;
	}

	.pallet-input::placeholder,
  .weight-input::placeholder {
		font-size: 1rem;
		font-family: inherit;
	}

	.pallet-input:empty,
  .weight-input:empty {
		font-family: inherit;
	}

	.pallet-button {
		width: 4rem;
		font-size: 2rem;
		font-family: monospace;
	}
</style>
