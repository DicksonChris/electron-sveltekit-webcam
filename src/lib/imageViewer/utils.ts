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

export function getImages(filename: string, callback?: () => void) {
  fileSystemAPI.getImages(filename)
  fileSystemAPI.onImagesList('imagesList', (event, data) => {
    // Set the value of imagesList store
    imagesList.set(data)
    // Reset the value of imageIndex store
    imageIndex.set(0)

    if (callback) {
      callback()
    }
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
  getImages(filename, loadFirstImage)
}

export function handleNextImage() {
  // Use the custom function to update the imageIndex by 1
  updateImageIndex(1)

  // Set the image buffer for the new index
  let list: string[] | null = []
  let index = 0
  imagesList.subscribe(value => {
    list = value
  })()
  imageIndex.subscribe(value => {
    index = value
  })()
  if (list && list.length > 0) {
    getImage(list[index])
  }
}

export function handlePrevImage() {
  // Use the custom function to update the imageIndex by -1
  updateImageIndex(-1)

  // Set the image buffer for the new index
  let list: string[] | null = []
  let index = 0
  imagesList.subscribe(value => {
    list = value
  })()
  imageIndex.subscribe(value => {
    index = value
  })()
  if (list && list.length > 0) {
    getImage(list[index])
  }
}

async function loadFirstImage() {
  let list: string[] | null = []
  const unsubscribe = imagesList.subscribe(value => {
    list = value
  })
  if (list && list.length > 0) {
    getImage(list[0])
  }
  unsubscribe()
}