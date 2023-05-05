<script lang="ts">
	import { onMount } from 'svelte'
	import IoMdClose from 'svelte-icons/io/IoMdClose.svelte'
	import FaRegWindowMinimize from 'svelte-icons/fa/FaRegWindowMinimize.svelte'
	import IoIosSquareOutline from 'svelte-icons/io/IoIosSquareOutline.svelte'
	import FaRegWindowRestore from 'svelte-icons/fa/FaRegWindowRestore.svelte'
	const windowAPI = window.bridge.Window

	let isMaximized = false

	async function updateWindowMaximized() {
		// use await to get the value from the promise
		isMaximized = await windowAPI.isMaximized()
	}

	onMount(() => {
		// update the variable when the component mounts
		updateWindowMaximized()

		// listen for the resize event and update the variable accordingly
		window.addEventListener('resize', updateWindowMaximized)

		// remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', updateWindowMaximized)
		}
	})
</script>

<div class="h-screen flex flex-col shrink-0 overflow-y-hidden">
	<header class="flex fixed top-0 h-8 bg-[#254053] w-full text-stone-50">
		<div class="drag-region flex-1">
			<div class="flex items-center h-full pl-2">
				<span class="text-sm font-normal">Electron Svelte</span>
			</div>
		</div>
		<div class="flex-0">
			<div class="flex">
				<button
					on:click={windowAPI.minimize}
					class="flex justify-center align-center h-8 w-12 max-w-12 hover:bg-gray-500/40"
				>
					<div class="flex text-gray-500 w-3 h-6 pt-1 pb-1">
						<FaRegWindowMinimize />
					</div>
				</button>
				{#if isMaximized}
					<button
						on:click={windowAPI.restore}
						class="flex justify-center align-center h-8 w-12 max-w-12 hover:bg-gray-500/40"
					>
						<div class="flex text-gray-500 w-4 pt-2 pb-1">
							<FaRegWindowRestore />
						</div>
					</button>
				{:else}
					<button
						on:click={windowAPI.maximize}
						class="flex justify-center align-center h-8 w-12 max-w-12 hover:bg-gray-500/40"
					>
						<div class="flex self-center text-gray-500 w-5 pt-1 pb-1">
							<IoIosSquareOutline />
						</div>
					</button>
				{/if}
				<button
					on:click={windowAPI.exit}
					class="flex justify-center align-center h-8 w-12 hover:bg-red-600 hover:text-pink-200 text-gray-500"
				>
					<div class="flex h-full w-6 pt-1 pb-1 pr-1">
						<IoMdClose />
					</div>
				</button>
			</div>
		</div>
	</header>

	<main
		class="overflow-y-auto mt-4 fixed top-8">
		<!-- fixed top-8 to avoid the titlebar -->
		<slot />
	</main>
</div>

<style>
	.drag-region {
		-webkit-app-region: drag;
	}

	/* 
  @media (-webkit-device-pixel-ratio: 1.5),
    (device-pixel-ratio: 1.5),
    (-webkit-device-pixel-ratio: 2),
    (device-pixel-ratio: 2),
    (-webkit-device-pixel-ratio: 3),
    (device-pixel-ratio: 3) {
    #window-controls .icon {
      width: 10px;
      height: 10px;
    }
  } */
</style>
