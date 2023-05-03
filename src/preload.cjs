const os = require('os')
const path = require('path')
const { contextBridge, ipcRenderer} = require('electron')

const WindowAPIS = {
  isMaximized: () => ipcRenderer.invoke('window/is-maximized'),
  minimize: () => ipcRenderer.send('window/minimize'),
  maximize: () => ipcRenderer.send('window/maximize'),
  restore: () => ipcRenderer.send('window/restore'),
  show: () => ipcRenderer.send('window/show'),
  exit: () => ipcRenderer.send('window/exit'),
}

const FileSystemAPIS = {
  saveImage: (data) => ipcRenderer.send('saveImage', data),
  scanImage: (filename) => ipcRenderer.send('scanImage', filename),
  onScanMessage: (channel, callback) => ipcRenderer.on(channel, callback),
}


const APP_BRIDGE = {
  Window: WindowAPIS,
  FileSystem: FileSystemAPIS
}

contextBridge.exposeInMainWorld('bridge', APP_BRIDGE)
