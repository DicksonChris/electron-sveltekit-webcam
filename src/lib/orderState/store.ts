import { writable } from 'svelte/store'


export const poNumber = writable('')

export const setPoNumber = (value: string) => {
	poNumber.set(value) // use the set method to update the value of the store
}