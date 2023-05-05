import { writable } from 'svelte/store'
import { isScanning } from '$lib/freightLog/scan'

const fileSystemAPI = window.bridge.FileSystem

export const output = writable('')
export const error = writable('')
export const isScanningStore = writable(false)
export const totalPages = writable<number | null>(null)
export const existsAlready = writable(false)

let scannedPages = 0

fileSystemAPI.onScanMessage('scanOutput', (event, data) => {
	output.update((value) => {
		if (value.includes('File already exists.')) {
			existsAlready.set(true)
			return value + 'File already exists.' + '\n'
		}
		const updatedValue = value + data + '\n'
		isScanningStore.set(isScanning(updatedValue))
		// increment the scannedPages variable every time a page is scanned
		if (data.includes('Scanned page')) {
			scannedPages++
		}
		// set the totalPages store to the scannedPages variable when scanning is finished
		if (data.includes('Finished saving images')) {
			totalPages.set(scannedPages)
		}
		return updatedValue
	})
})

fileSystemAPI.onScanMessage('scanError', (event, data) => {
	error.update((value) => {
		const updatedValue = value + data + '\n'
		isScanningStore.set(isScanning(updatedValue))
		return updatedValue
	})
})
