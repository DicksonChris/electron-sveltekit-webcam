const fileSystemAPI = window.bridge.FileSystem

const redLines = ['No pages are in the feeder.', 'The selected scanner is busy.']
const greenLines = ['Beginning scan', 'Scanned page', 'Exporting image', 'Finished saving images']

export function scanFreightLog(filename: string) {
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

export function getTotalPages(data: string): number | null {
  const regex = /Scanned page \d+ of (\d+)/;
  const match = data.match(regex);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  return null;
}