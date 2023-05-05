import { imageBuffer, imagesList, imageIndex, updateImageIndex } from './store'

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

export function createImageURL(buffer: ArrayBuffer | null) {
  if (!buffer) return
  const blob = new Blob([buffer], { type: 'image/jpeg' })
  const url = URL.createObjectURL(blob)
  return url
}

export async function loadFirstImage() {
  let list: string[] | null = []
  const unsubscribe = imagesList.subscribe(value => {
    list = value
  })
  if (list && list.length > 0) {
    getImage(list[0])
  }
  unsubscribe()
}