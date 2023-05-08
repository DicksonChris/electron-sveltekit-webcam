/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare interface Window {
	bridge: {
		FileSystem: {
			// Used to save the image from a camera
			saveImage: (data: {
				PO_NUMBER: string,
				PALLET_NUMBER: number,
				name: string,
				timestamp: string,
				blob: string | ArrayBuffer | null
			}) => void
			// Used to initiate the scan process
			scanImage: (filename: string, testing?: boolean) => void
			// Console output from the scan process
			onScanMessage: (channel: string, callback: (event: any, data: string) => void) => void
			// Used to get a single scan from the file system
			getImage: (filename: string) => void
			onImageBuffer: (channel: string, callback: (event: any, data: ArrayBuffer) => void) => void
			// Used to get the list of scans from the file system
			getImages: (filename: string) => void
			onImagesList: (channel: string, callback: (event: any, data: string[]) => void) => void

			checkImages: (filename: string) => void
			onCheckResult: (channel: string, callback: (event: any, data: boolean) => void) => void

			// Used to rotate an image by 180 degrees
			rotateImage: ({ filename, buffer }: { filename: string; buffer: ArrayBuffer }) => void
			// Result of the rotation operation
			onRotateResult: (
				channel: string,
				callback: (event: any, data: Buffer | Error) => void
			) => void
			// Delete image
			deleteImage: (filename: string) => void
			// Result of the delete operation
			onDeleteResult: (channel: string, callback: (event: any, data: boolean) => void) => void

			// // Save rotated image
			// saveRotatedImage: (filename: any, data: any)
			// // (filename: string, data: ArrayBuffer) => void
			// // Result of the save operation
			// onSaveResult: (channel: any, callback: (event: any, data: any) => void) => void
			// // (channel: string, callback: (event: any, data: boolean) => void) => void

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
