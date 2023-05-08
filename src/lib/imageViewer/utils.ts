import { clearFreightLogStore } from '$lib/freightLog/store'
import { imageBuffer, imagesList, imageIndex, updateImageIndex, clearImageViewerStore } from './store'

const fileSystemAPI = window.bridge.FileSystem

export function getImage(filename: string) {
	fileSystemAPI.getImage(filename)
	fileSystemAPI.onImageBuffer('imageBuffer', (event, data) => {
		// Set the value of imageBuffer store
		imageBuffer.set(data)
	})
	fileSystemAPI.onImageBuffer('imageError', (event, error) => {
		console.error(error)
	})
}

export function getImages(filename: string, callback?: () => void) {
	fileSystemAPI.getImages(filename)
	fileSystemAPI.onImagesList('imagesList', (event, data) => {
		// Set the value of imagesList store
		imagesList.set(data)
		// Reset the value of imageIndex store
		imageIndex.set(0)

		if (callback) {
			callback()
		}
	})
	fileSystemAPI.onImagesList('imagesError', (event, error) => {
		console.error(error)
	})
}

export function createImageURL(buffer: ArrayBuffer | null) {
	if (!buffer) return
	const blob = new Blob([buffer], { type: 'image/jpeg' })
	const url = URL.createObjectURL(blob)
	return url
}

export async function loadFirstImage() {
	let list: string[] | null = []
	const unsubscribe = imagesList.subscribe((value) => {
		list = value
	})
	if (list && list.length > 0) {
		getImage(list[0])
	}
	unsubscribe()
}

export function nextImage() {
	// Use the custom function to update the imageIndex by 1
	updateImageIndex(1)

	// Set the image buffer for the new index
	let list: string[] | null = []
	let index = 0
	imagesList.subscribe((value) => {
		list = value
	})()
	imageIndex.subscribe((value) => {
		index = value
	})()
	if (list && list.length > 0) {
		getImage(list[index])
	}
}

export function prevImage() {
	// Use the custom function to update the imageIndex by -1
	updateImageIndex(-1)

	// Set the image buffer for the new index
	let list: string[] | null = []
	let index = 0
	imagesList.subscribe((value) => {
		list = value
	})()
	imageIndex.subscribe((value) => {
		index = value
	})()
	if (list && list.length > 0) {
		getImage(list[index])
	}
}

export function rotateImage(filename: string) {
	// get the current image buffer and send it to electron for rotation
	let buffer: ArrayBuffer | null = null
	imageBuffer.subscribe((value) => {
		buffer = value
	})()
	if (buffer) {
		fileSystemAPI.rotateImage({ filename, buffer })
		fileSystemAPI.onRotateResult('rotateSuccess', (event, data) => {
			// update the image buffer with the rotated data
			imageBuffer.set(data)

			// save the rotated image to the file system using electron API
			let list: string[] | null = []
			let index = 0
			imagesList.subscribe((value) => {
				list = value
			})()
			imageIndex.subscribe((value) => {
				index = value
			})()
			// if (list && list.length > 0) {
			// 	const filename = list[index]
			// 	fileSystemAPI.saveImage(filename, Buffer.from(data))
			// 	fileSystemAPI.onScanMessage('saveSuccess', (event, message) => {
			// 		console.log(message)

			// 		// reload the image buffer from the file system
			// 		getImage(filename)
			// 	})
			// 	fileSystemAPI.onScanMessage('saveError', (event, error) => {
			// 		console.error(error)
			// 	})
			// }
		})
		fileSystemAPI.onRotateResult('rotateError', (event, error) => {
			console.error(error)
		})
	}
}

export async function deleteImage(filename: string) {
	
	fileSystemAPI.deleteImage(filename)
	// Wait for the deleteSuccess event to resolve
	await new Promise<void>(resolve => {
		fileSystemAPI.onScanMessage('deleteSuccess', (event, message) => {
			console.log(message)
			if (message.includes("Folder")) {
				clearImageViewerStore()
				clearFreightLogStore()
			}
			resolve()
		})
	})
	fileSystemAPI.onScanMessage('deleteError', (event, error) => {
		console.error(error)
	})
	// Convert <filename>.1.jpg to <filename>
	filename = filename.split('.')[0]
	getImages(filename, loadFirstImage)
	// Update the imagesList store by removing the deleted filename
	imagesList.update(list => list ? list.filter(item => item !== filename) : null)
}