// Import the child_process and path modules with import statements
import { spawn } from 'child_process'
import path from 'path'

// Import the chalk module with default import
import chalk from 'chalk'

// Get the filename from the command-line arguments
const filename = process.argv[2]

// Define the command to execute
const command = path.join('C:', 'Users', 'chris', 'naps2', 'NAPS2.Console.exe')

// Define the arguments to pass to the command
const args = [
  '-v',
  '-p',
  'freightLogScanner',
  '-o',
  path.join('C:', 'Users', 'chris', 'Desktop', 'Projects', 'hp-scan', filename + '.jpg'),
  '--jpegquality',
  '90',
]

// Spawn the command and get the ChildProcess object
const child = spawn(command, args)

// Define the array of lines to highlight in red
const redLines = ['No pages are in the feeder.']

// Define the array of lines to highlight in green
const greenLines = ['Beginning scan', 'Scanned page', 'Exporting image', 'Finished saving images']

// Define a function that checks if the output includes any of the lines in the array and logs it in the given color
// It returns a boolean value indicating if a match is found or not
function checkAndLog(output, lines, color) {
  // Use the some method to test if any element in the lines array passes the test function
  let matchFound = lines.some((line) => {
    // Check if the output includes the current element
    return output.includes(line)
  })
  // If a match is found, log it in the given color
  if (matchFound) {
    // Use the chalk module with a color method based on the parameter
    console.log(chalk[color](`stdout: ${output}`))
  }
  // Return the matchFound value
  return matchFound
}

// Listen to the data event on stdout and handle each chunk of data
child.stdout.on('data', (data) => {
  // Convert the data to a string
  const output = data.toString()
  // Trim any whitespace from both ends of the output
  const trimmedOutput = output.trim()
  // Check if the trimmed output includes any of the red lines and log it in red or normal color
  // Use the checkAndLog function with red as the color parameter
  let matchFound = checkAndLog(trimmedOutput, redLines, 'red')
  // If no match is found, check if the trimmed output includes any of the green lines and log it in green or normal color
  // Use the checkAndLog function with green as the color parameter
  if (!matchFound) {
    matchFound = checkAndLog(trimmedOutput, greenLines, 'green')
    // If no match is found, log it in normal color
    if (!matchFound) {
      console.log(`stdout: ${output}`)
    }
  }
})
