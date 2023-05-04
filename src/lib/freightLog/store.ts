import { writable } from 'svelte/store'
import { isScanning } from '$lib/freightLog/scan'

const fileSystemAPI = window.bridge.FileSystem

export const output = writable('')
export const error = writable('')
export const isScanningStore = writable(false)

fileSystemAPI.onScanMessage('scanOutput', (event, data) => {
  output.update((value) => value + data + '\n')
  isScanningStore.set(isScanning(data))
})

fileSystemAPI.onScanMessage('scanError', (event, data) => {
  error.update((value) => value + data + '\n')
  isScanningStore.set(isScanning(data))
})
