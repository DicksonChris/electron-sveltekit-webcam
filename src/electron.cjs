const windowStateManager = require('electron-window-state')
const { app, BrowserWindow, ipcMain } = require('electron')
const contextMenu = require('electron-context-menu')
const serve = require('electron-serve')
const os = require('os')
const fs = require('fs')
const { spawn } = require('child_process')
const path = require('path')
const sharp = require('sharp')

const helpers = require('./scripts/electronHelpers.cjs')
const nodeConsole = require('console')
const myConsole = new nodeConsole.Console(process.stdout, process.stderr)

const dotenv = require('dotenv')
dotenv.config()

try {
	require('electron-reloader')(module)
} catch (e) {
	console.error(e)
}

const serveURL = serve({ directory: '.' })
const port = process.env.PORT || 5173
const dev = !app.isPackaged
let mainWindow

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600
	})

	const mainWindow = new BrowserWindow({
		backgroundColor: 'whitesmoke',
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 32
		},
		minHeight: 450,
		minWidth: 500,
		webPreferences: {
			enableRemoteModule: false,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs')
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height
	})

	windowState.manage(mainWindow)

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		mainWindow.focus()
	})

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow)
	})

	if (dev) {
		mainWindow.webContents.openDevTools() // Open DevTools by default
	}

	return mainWindow
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Make App 💻'
		}
	]
})

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.error('Error loading URL, retrying', e)
		setTimeout(() => {
			loadVite(port)
		}, 200)
	})
}

function createMainWindow() {
	mainWindow = createWindow()
	mainWindow.once('close', () => {
		mainWindow = null
	})

	if (dev) loadVite(port)
	else serveURL(mainWindow)
}

app.once('ready', createMainWindow)
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow()
	}
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('window/is-maximized', () => {
	return mainWindow.isMaximized()
})
ipcMain.on('window/minimize', () => mainWindow.minimize())
ipcMain.on('window/maximize', () => mainWindow.maximize())
ipcMain.on('window/restore', () => mainWindow.unmaximize())
ipcMain.on('window/show', () => mainWindow.show())
ipcMain.on('window/exit', () => app.quit())

/**
 * @typedef {Object} Data
 * @property {string} PO_NUMBER
 * @property {number} PALLET_NUMBER
 * @property {string} name
 * @property {string} timestamp
 * @property {string | ArrayBuffer | null} blob
 */

ipcMain.on('saveImage', (event, /** @type {Data} */ data) => {
	const poNumber = data.PO_NUMBER
	const palletNumber = data.PALLET_NUMBER
	const imgBuffer = Buffer.from(data.blob)
	const timestamp = data.timestamp
	const name = data.name

	const filename = `${name}_${timestamp}.jpg`
	const folderPath = path.join(process.env.SCAN_FOLDER, poNumber, filename)
	fs.writeFile(folderPath, imgBuffer, (err) => {
		if (err) {
			console.error(err)
		} else {
			console.log(`Image saved to ${folderPath}`)
		}
	})
})

ipcMain.on('scanImage', (event, filename, testing = false) => {
	// Create a folder named after the filename
	const folderPath = path.join(process.env.SCAN_FOLDER, filename)
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath)
	}

	// Spawn the node script with the filename as an argument
	const command = 'node'
	const args = ['./src/scripts/scanlog.mjs', folderPath, filename, testing] // Pass folderPath as an additional argument
	const child = spawn(command, args)

	child.stdout.on('data', (data) => {
		const output = data.toString()
		// send the output to the renderer process
		event.reply('scanOutput', output)
	})

	child.stderr.on('data', (data) => {
		const error = data.toString()
		// send the error to the renderer process
		event.reply('scanError', error)
	})
})

ipcMain.on('getImage', (event, filename) => {
	const foldername = filename.split('.')[0]
	const filepath = path.join(process.env.SCAN_FOLDER, foldername, filename)

	fs.readFile(filepath, (err, data) => {
		if (err) {
			event.reply('imageError', err.message)
		} else {
			event.reply('imageBuffer', data)
		}
	})
})

ipcMain.on('getImages', (event, filename) => {
	const folderpath = path.join(process.env.SCAN_FOLDER, filename)
	fs.readdir(folderpath, (err, files) => {
		if (err) {
			// send the error to the renderer process
			event.reply('imagesError', err.message)
		} else {
			// filter for .jpg files containing the filename
			const images = files.filter(
				(file) => path.extname(file) === '.jpg' && file.includes(filename)
			)
			// send the images list to the renderer process
			event.reply('imagesList', images)
		}
	})
})

ipcMain.on('checkImages', (event, filename) => {
	const folderpath = path.join(process.env.SCAN_FOLDER, filename)
	// Check if the folder exists
	fs.access(folderpath, fs.constants.F_OK, (err) => {
		// If the folder does not exist, send an empty array of images and return
		if (err) {
			event.reply('checkResult', [])
			return
		}
		// The folder exists, proceed to read its contents
		fs.readdir(folderpath, (err, files) => {
			// If there is an error reading the folder, send the error and return
			if (err) {
				event.reply('checkError', err.message)
				return
			}
			// Filter for .jpg files containing the filename
			const images = files.filter(
				(file) => path.extname(file) === '.jpg' && file.includes(filename)
			)
			// Send the images list to the renderer process
			event.reply('checkResult', images)
		})
	})
})

ipcMain.on('rotateImage', (event, { filename, buffer }) => {
	myConsole.log('Rotating image: ', filename)
	sharp(buffer)
		.rotate(180)
		.toBuffer()
		.then((data) => {
			event.reply('rotateSuccess', data)
		})
		.catch((error) => {
			event.reply('rotateError', error.message)
		})
})

ipcMain.on('deleteImage', async (event, filename) => {
  const SCAN_FOLDER = process.env.SCAN_FOLDER
  try {
    // get folder name and file path
    const foldername = filename.split('.')[0]
    const filepath = path.join(SCAN_FOLDER, foldername, filename)

    // log deletion
    myConsole.log('Deleting image: ', filepath)

    // delete file
    await helpers.deleteFile(filepath)

    // send success message
    event.reply('deleteSuccess', 'Image deleted!')

    // check if folder is empty
    const files = await helpers.readFolder(path.join(SCAN_FOLDER, foldername))

    // if folder is empty, delete it
    if (files.length === 0) {
      await helpers.deleteFolder(path.join(SCAN_FOLDER, foldername))

      // send success message
      event.reply('deleteSuccess', `Folder ${foldername} deleted!`)
    }
  } catch (err) {
    // send error message
    event.reply('deleteError', err.message)
  }
})

ipcMain.on('saveRotatedImage', (event, { filename, buffer }) => {
	// check if buffer is defined and has a byteLength property
	if (buffer && buffer.byteLength) {
		// convert buffer to a Buffer instance
		buffer = Buffer.from(buffer)
		const foldername = path.join(process.env.SCAN_FOLDER, filename)
		const filepath = path.join(process.env.SCAN_FOLDER, foldername, filename + '.jpg')
		myConsole.log('Saving rotated image: ', filepath)
		fs.writeFile(filepath, buffer, (err) => {
			if (err) {
				event.reply('saveError', err.message)
			} else {
				event.reply('saveSuccess', 'Image saved!')
			}
		})
	} else {
		// send an error message if buffer is invalid
		event.reply('saveError', 'Invalid buffer argument')
	}
})
