const os = require('os')
const path = require('path')
const { contextBridge, ipcRenderer, dialog } = require('electron')
const Toastify = require('toastify-js') // TODO: Do I need this?

// TODO: Make this typescript
// declare global {
//   interface Window {
//     bridge: typeof APP_BRIDGE;
//     // ipcRenderer: typeof ipcRenderer;
//   }
// }

const WindowAPIS = {
  isMaximized: () => ipcRenderer.invoke('window/is-maximized'),
  minimize: () => ipcRenderer.send('window/minimize'),
  maximize: () => ipcRenderer.send('window/maximize'),
  restore: () => ipcRenderer.send('window/restore'),
  show: () => ipcRenderer.send('window/show'),
  exit: () => ipcRenderer.send('window/exit'),
}

// contextBridge.exposeInMainWorld('os', {
//   homedir: () => os.homedir(),
// })

// contextBridge.exposeInMainWorld('path', {
//   join: (...args) => path.join(...args),
// })

// contextBridge.exposeInMainWorld('ipcRenderer', {
//   send: (channel, data) => ipcRenderer.send(channel, data),
//   on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
// })

// contextBridge.exposeInMainWorld('Toastify', {
//   toast: (options) => Toastify(options).showToast(),
// })

// contextBridge.exposeInMainWorld('electron', {
//   send: (channel, data) => {
//     ipcRenderer.send(channel, data)
//   },
//   sendSync: (channel, data) => {
//     ipcRenderer.sendSync(channel, data)
//   },
//   receive: (channel, func) => {
//     ipcRenderer.on(channel, (event, ...args) => func(...args))
//   },
//   closeApp: () => ipcRenderer.send('window-all-closed'),
//   showOpenDialog: () => dialog.showOpenDialog({ properties: ['openFile'] }),
// })

const APP_BRIDGE = {
  Window: WindowAPIS,
}

contextBridge.exposeInMainWorld('bridge', APP_BRIDGE)
