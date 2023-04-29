<script lang="ts">
	function handleClose() {
		console.log(window.electron)

		window.electron.closeApp()
	}
</script>

<div id="main-wrapper">
	<header id="titlebar">
		<div id="drag-region">
			<div id="window-title">
				<span>Electron quick start</span>
			</div>
			<div id="window-controls">
				<button on:click={handleClose} class="button hover:bg-red-600" id="close-button">
					close
				</button>
			</div>
		</div>
	</header>

	<main id="main">
		<slot />
	</main>
</div>

<style>
	.icon {
		user-select: none;
	}

	#main-wrapper {
		overflow-y: hidden;
	}

	#titlebar {
		display: block;
		position: fixed;
		top: 0;
		height: 32px;
		width: calc(100% - 2px); /*Compensate for body 1px border*/
		background: #254053;
		padding: 4px;
		color: #fff;
	}

	#main {
		height: calc(100% - 32px);
		margin-top: 32px;
		padding: 20px;
		overflow-y: auto;
	}

	#titlebar #drag-region {
		display: grid;
		grid-template-columns: auto 138px;
		width: 100%;
		height: 100%;
		-webkit-app-region: drag;
	}

	#window-title {
		grid-column: 1;
		display: flex;
		align-items: center;
		margin-left: 8px;
		overflow: hidden;
		font-family: 'Segoe UI', sans-serif;
		font-size: 12px;
	}

	#window-title span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 1.5;
	}

	#window-controls {
		display: grid;
		grid-template-columns: repeat(3, 46px);
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
	}

	#window-controls .button {
		grid-row: 1 / span 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	#min-button {
		grid-column: 1;
	}
	#max-button,
	#restore-button {
		grid-column: 2;
	}
	#close-button {
		grid-column: 3;
	}

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
	}
</style>
