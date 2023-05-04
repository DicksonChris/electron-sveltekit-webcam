import { writable } from 'svelte/store'

export const imageBuffer = writable<ArrayBuffer | null>(null)
export const imagesList = writable<string[] | null>(null)
export const imageIndex = writable<number>(0)

export function updateImageIndex(delta: number) {
  // Get the current values of imagesList and imageIndex
  let list: string[] | null = []
  let index = 0
  imagesList.subscribe(value => {
    list = value
  })()
  imageIndex.subscribe(value => {
    index = value
  })()

  // Update the imageIndex based on the delta and the imagesList length
  if (list && list.length > 0) {
    index += delta
    if (index >= list.length) {
      index = 0
    } else if (index < 0) {
      index = list.length - 1
    }
    // Set the new value of imageIndex
    imageIndex.set(index)
  }
}