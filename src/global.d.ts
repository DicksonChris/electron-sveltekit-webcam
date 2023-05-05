/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare interface Window {
	bridge: {
		FileSystem: {
			// Used to save the image from a camera
			saveImage: (filename: string, data: ArrayBuffer) => void
			// Used to initiate the scan process
			scanImage: (filename: string) => void
			// Console output from the scan process
			onScanMessage: (channel: string, callback: (event: any, data: string) => void) => void
			// Used to get a single scan from the file system
			getImage: (filename: string) => void
			onImageBuffer: (channel: string, callback: (event: any, data: ArrayBuffer) => void) => void
			// Used to get the list of scans from the file system
			getImages: (filename: string) => void
			onImagesList: (channel: string, callback: (event: any, data: string[]) => void) => void
		}
		Window: {
			// Used to check if the window is maximized
			isMaximized: () => Promise<any>
			// Used to minimize the window
			minimize: () => void
			// Used to maximize the window
			maximize: () => void
			// Used to restore the window
			restore: () => void
			// Used to show the window
			show: () => void
			// Used to exit the application
			exit: () => void
		}

	}
}
