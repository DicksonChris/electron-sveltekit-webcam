import { spawn } from 'child_process'
import path from 'path'

const filename = process.argv[2]
const command = path.join('C:', 'Users', 'chris', 'naps2', 'NAPS2.Console.exe')
const args = [
  '-v',
  '-p',
  'freightLogScanner',
  '-o',
  path.join('C:', 'Users', 'chris', 'Desktop', 'Projects', 'hp-scan', filename + '.jpg'),
  '--jpegquality',
  '90',
]

const child = spawn(command, args)

child.stdout.on('data', (data) => {
  console.log(data.toString())
})
