const { contextBridge, ipcRenderer, dialog } = require('electron')

contextBridge.exposeInMainWorld('electron', {
	send: (channel, data) => {
		ipcRenderer.send(channel, data)
	},
	sendSync: (channel, data) => {
		ipcRenderer.sendSync(channel, data)
	},
	receive: (channel, func) => {
		ipcRenderer.on(channel, (event, ...args) => func(...args))
	},
	closeApp: () => ipcRenderer.send('window-all-closed'),
	showOpenDialog: () => dialog.showOpenDialog({ properties: ['openFile'] })
})
