import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

const folderPath = process.argv[2] // Get folderPath from the command-line arguments
const filename = process.argv[3] // Get filename from the command-line arguments

// The testing flag is a boolean value that you can pass as the fourth argument when 
// you run the script. For example, if you want to use the testingScanner profile, 
// you can run the script like this:
//   $ node script.js folderPath filename true

// You can omit the testing flag and it will default to false:
//   $ node script.js folderPath filename
const testing = process.argv[4] // Get testing flag from the command-line arguments

const command = path.join('C:', 'Users', 'chris', 'naps2', 'NAPS2.Console.exe')
const args = [
  '-v',
  '-p',
  testing ? 'testingScanner' : 'freightLogScanner',
  '-o',
  path.join(folderPath, filename + '.jpg'), // Save the scanned image inside the folderPath
  '--jpegquality',
  '90',
]

const child = spawn(command, args)

let buffer = ''
child.stdout.on('data', (data) => {
  // Convert the data to a string and append it to the buffer
  buffer += data.toString()
  // Split the buffer by newline characters
  const lines = buffer.split('\n')
  // Check if the last element of the array is an empty string
  if (lines[lines.length - 1] === '') {
    // The buffer ends with a complete line, remove the last element
    lines.pop()
    // Clear the buffer
    buffer = ''
  } else {
    // The buffer ends with a partial line, remove the last element and store it in the buffer
    buffer = lines.pop()
  }
  // Filter out the lines that match the regex
  const regex = new RegExp(`${filename}\\.jpg$`) // Match lines that end with filename.jpg
  const filteredLines = lines.filter((line) => !regex.test(line)) // Keep only the lines that do not match the regex
  // Join the filtered lines by newline characters
  const filteredOutput = filteredLines.join('\n')
})

child.on('close', (code) => {
  if (code !== 0) console.error(`Child process exited with code ${code}`)
  // Check if there is a file with the same filename without the .1.jpg extension
  const file = path.join(folderPath, filename + '.jpg')
  if (fs.existsSync(file)) {
    // Find the next available number for the file extension
    const regex = new RegExp(filename + '\\.(\\d+)\\.jpg') // Match files that have the same filename with a number suffix
    const files = fs.readdirSync(folderPath).filter((file) => regex.test(file)) // Filter the files that match the regex
    const numbers = files.map((file) => parseInt(file.match(regex)[1])) // Extract the numbers from the files
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0 // Find the highest number
    const nextNumber = maxNumber + 1 // Add one to get the next number
    // Rename the file to have a .n.jpg extension where n is the next number
    const newPath = path.join(folderPath, filename + '.' + nextNumber + '.jpg')
    fs.renameSync(file, newPath)
    console.log(`Finished saving images ${newPath}`)
  }
})