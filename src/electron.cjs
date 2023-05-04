const windowStateManager = require('electron-window-state')
const { app, BrowserWindow, ipcMain } = require('electron')
const contextMenu = require('electron-context-menu')
const serve = require('electron-serve')
const os = require('os')
const fs = require('fs')
const { spawn } = require('child_process')
const path = require('path')

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
    defaultHeight: 600,
  })

  const mainWindow = new BrowserWindow({
    backgroundColor: 'whitesmoke',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 17,
      y: 32,
    },
    minHeight: 450,
    minWidth: 500,
    webPreferences: {
      enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegration: true,
      spellcheck: false,
      devTools: dev,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
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
      label: 'Make App 💻',
    },
  ],
})

function loadVite(port) {
  mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
    console.log('Error loading URL, retrying', e)
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

ipcMain.on('saveImage', (event, imageObject) => {
  const imgBuffer = Buffer.from(imageObject.blob)
  const timestamp = imageObject.timestamp
  const name = imageObject.name

  const filename = `${name}_${timestamp}.jpg`
  const savePath = path.join(app.getPath('pictures'), filename)
  fs.writeFile(savePath, imgBuffer, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Image saved to ${savePath}`)
    }
  })
})

ipcMain.on('scanImage', (event, filename) => {
  // spawn the node script with the filename as an argument
  const command = 'node'
  const args = ['./src/scripts/scanlog.mjs', filename]
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
  // join the filename with the path
  const filepath = path.join('C:\\Users\\chris\\Desktop\\Projects\\hp-scan', filename) // added this line
  // read the file as a buffer
  fs.readFile(filepath, (err, data) => {
    if (err) {
      // send the error to the renderer process
      event.reply('imageError', err.message)
    } else {
      // send the buffer to the renderer process
      event.reply('imageBuffer', data)
    }
  })
})

ipcMain.on('getImages', (event, filename) => {
  // use the fixed path
  const folderpath = 'C:\\Users\\chris\\Desktop\\Projects\\hp-scan'
  // read the folder and filter for .jpg files containing the filename
  fs.readdir(folderpath, (err, files) => {
    if (err) {
      // send the error to the renderer process
      event.reply('imagesError', err.message)
    } else {
      // filter for .jpg files containing the filename
      const images = files.filter(file => path.extname(file) === '.jpg' && file.includes(filename))
      // send the images list to the renderer process
      event.reply('imagesList', images)
    }
  })
})