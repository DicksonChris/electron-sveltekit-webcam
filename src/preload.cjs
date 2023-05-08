const os = require('os')
const path = require('path')
const { contextBridge, ipcRenderer } = require('electron')

const WindowAPIS = {
	isMaximized: () => ipcRenderer.invoke('window/is-maximized'),
	minimize: () => ipcRenderer.send('window/minimize'),
	maximize: () => ipcRenderer.send('window/maximize'),
	restore: () => ipcRenderer.send('window/restore'),
	show: () => ipcRenderer.send('window/show'),
	exit: () => ipcRenderer.send('window/exit')
}

const FileSystemAPIS = {
	// Used to save stills from the camera
	saveImage: (data) => ipcRenderer.send('saveImage', data),
	// Used to initiate a scan
	scanImage: (filename) => ipcRenderer.send('scanImage', filename),
	// Returns the console output of the scan
	onScanMessage: (channel, callback) => ipcRenderer.on(channel, callback),
	// Used to get a single scan jpg
	getImage: (filename) => ipcRenderer.send('getImage', filename),
	onImageBuffer: (channel, callback) => ipcRenderer.on(channel, callback),
	// Used to get scan jpgs
	getImages: (filename) => ipcRenderer.send('getImages', filename),
	onImagesList: (channel, callback) => ipcRenderer.on(channel, callback),
	// Used to check for existing images
	checkImages: (filename) => ipcRenderer.send('checkImages', filename),
	onCheckResult: (channel, callback) => ipcRenderer.on(channel, callback),
	// Used to rotate images
	rotateImage: ({ filename, buffer }) => ipcRenderer.send('rotateImage', { filename, buffer }),
	onRotateResult: (channel, callback) => ipcRenderer.on(channel, callback),
	// Used to save rotated images
	saveRotatedImage: ({ filename, buffer }) => ipcRenderer.send('saveRotatedImage', { filename, buffer }),
	onSaveResult: (channel, callback) => ipcRenderer.on(channel, callback)
}

const APP_BRIDGE = {
	Window: WindowAPIS,
	FileSystem: FileSystemAPIS
}

contextBridge.exposeInMainWorld('bridge', APP_BRIDGE)
