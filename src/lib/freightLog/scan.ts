import { output, error } from '$lib/freightLog/store'

const fileSystemAPI = window.bridge.FileSystem

const redLines = ['No pages are in the feeder.', 'The selected scanner is busy.', 'File already exists.']
const greenLines = ['Beginning scan', 'Scanned page', 'Exporting image', 'Finished saving images']

export function scanFreightLog(filename: string) {
	output.set('')
	error.set('')
	fileSystemAPI.scanImage(filename)
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
		data.includes('The selected scanner is busy.')
	)
}