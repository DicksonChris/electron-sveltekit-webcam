// Import the child_process module with require
const { spawn } = require("child_process");

// Define a function that spawns the Node.js script and takes the filename as an argument
function spawnScript(filename) {
  // Define the command to execute the Node.js script
  const command = "node";

  // Define the arguments to pass to the command
  const args = ["scanlog.mjs", filename];

  // Spawn the command and get the ChildProcess object
  const child = spawn(command, args);

  // Listen to the data event on stdout and handle each chunk of data
  child.stdout.on("data", (data) => {
    // Convert the data to a string
    const output = data.toString();
    // Do something with the output, such as logging it or displaying it in a window
    console.log(`stdout: ${output}`);
  });

  // Listen to the data event on stderr and handle any errors
  child.stderr.on("data", (data) => {
    // Convert the data to a string
    const error = data.toString();
    // Do something with the error, such as logging it or displaying it in a window
    console.error(`stderr: ${error}`);
  });
}

// Export the function as a module
module.exports = spawnScript;