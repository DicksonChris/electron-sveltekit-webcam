import { spawn } from 'child_process'
import path from 'path'

const folderPath = process.argv[2] // Get folderPath from the command-line arguments
const filename = process.argv[3] // Get filename from the command-line arguments
const command = path.join('C:', 'Users', 'chris', 'naps2', 'NAPS2.Console.exe')
const args = [
  '-v',
  '-p',
  'freightLogScanner',
  '-o',
  path.join(folderPath, filename + '.jpg'), // Save the scanned image inside the folderPath
  '--jpegquality',
  '90',
]

const child = spawn(command, args)

child.stdout.on('data', (data) => {
  console.log(data.toString())
})
