import { output, error } from '$lib/freightLog/store'
import { derived } from 'svelte/store'
import { isScanningStore, totalPages, existsAlready } from '$lib/freightLog/store'

const fileSystemAPI = window.bridge.FileSystem

const redLines = [
	'No pages are in the feeder.',
	'The selected scanner is busy.',
	'File already exists.',
	'The selected scanner is offline.'
]
const greenLines = ['Beginning scan', 'Scanned page', 'Exporting image', 'Finished saving images']

export async function scanFreightLog(filename: string, force = false) {
	output.set('')
	error.set('')

	// Check if the file already exists and matches the given pattern
	const fileExists = await checkFileExists(filename)
	if (fileExists && !force) {
		error.set('File already exists.')
		loadExistingImages(filename)
	} else {
		fileSystemAPI.scanImage(filename)
	}
}

export async function scanAdditionalFreightLog(filename: string) {
	output.set('')
	error.set('')
	fileSystemAPI.scanImage(filename)
	loadExistingImages(filename)
}

async function loadExistingImages(filename: string) {
	// Load the existing images and update the store values
	fileSystemAPI.getImages(filename)
	fileSystemAPI.onImagesList('imagesList', (event, images) => {
		totalPages.set(images.length)
		existsAlready.set(true)
	})
}

async function checkFileExists(filename: string): Promise<boolean> {
	return new Promise((resolve) => {
		fileSystemAPI.checkImages(filename)
		fileSystemAPI.onCheckResult('checkResult', (event, images) => {
			// Check if any image has a name that matches the given pattern
			const matchingImages = images.filter((image) => {
				const regex = new RegExp(`^${filename}(\\.\\d+)?\\.jpg$`)
				return regex.test(image)
			})

			resolve(matchingImages.length > 0)
		})
	})
}

export function formatOutput(output: string) {
	return output
		.split('\n')
		.map((line) => {
			let color = 'black'
			if (redLines.some((redLine) => line.includes(redLine))) {
				color = 'red'
			} else if (greenLines.some((greenLine) => line.includes(greenLine))) {
				color = 'green'
			}
			return `<p style="color: ${color};">${line}</p>`
		})
		.join('')
}

export function isScanning(data: string) {
	return !(
		data.includes('Finished saving images') ||
		data.includes('No pages are in the feeder.') ||
		data.includes('The selected scanner is busy.') ||
		data.includes('The selected scanner is offline.')
	)
}
