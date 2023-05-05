import { writable } from 'svelte/store'
import { isScanning, getTotalPages } from '$lib/freightLog/scan'

const fileSystemAPI = window.bridge.FileSystem

export const output = writable('')
export const error = writable('')
export const isScanningStore = writable(false)
export const totalPages = writable<number | null>(null)

fileSystemAPI.onScanMessage('scanOutput', (event, data) => {
  output.update((value) => {
    const updatedValue = value + data + '\n'
    isScanningStore.set(isScanning(updatedValue))

    const pages = getTotalPages(updatedValue)
    if (pages !== null) {
      totalPages.set(pages)
    }

    return updatedValue
  })
})

fileSystemAPI.onScanMessage('scanError', (event, data) => {
  error.update((value) => {
    const updatedValue = value + data + '\n'
    isScanningStore.set(isScanning(updatedValue))
    return updatedValue
  })
})
