import { imageBuffer, imagesList, imageIndex, updateImageIndex } from './store.ts'

const fileSystemAPI = window.bridge.FileSystem

export function getImage(filename: string) {
  fileSystemAPI.getImage(filename)
  fileSystemAPI.onImageBuffer('imageBuffer', (event, data) => {
    // Set the value of imageBuffer store
    imageBuffer.set(data)
  })
  fileSystemAPI.onImageBuffer('imageError', (event, error) => {
    console.error(error)
  })
}

export function getImages(filename: string) {
  fileSystemAPI.getImages(filename)
  fileSystemAPI.onImagesList('imagesList', (event, data) => {
    // Set the value of imagesList store
    imagesList.set(data)
    // Reset the value of imageIndex store
    imageIndex.set(0)
  })
  fileSystemAPI.onImagesList('imagesError', (event, error) => {
    console.error(error)
  })
}

export function createImageURL(buffer: ArrayBuffer) {
  const blob = new Blob([buffer], { type: 'image/jpeg' })
  const url = URL.createObjectURL(blob)
  return url
}

export function handleGetImage(event) {
  const { filename } = event.detail
  getImage(filename)
}

export function handleGetImages(event) {
  const { filename } = event.detail
  getImages(filename)
}

export function handleNextImage() {
  // Use the custom function to update the imageIndex by 1
  updateImageIndex(1)
}

export function handlePrevImage() {
  // Use the custom function to update the imageIndex by -1
  updateImageIndex(-1)
}