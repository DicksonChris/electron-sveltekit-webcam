import { writable } from 'svelte/store'


export const poNumber = writable('def')
export const palletNumber = writable(1)

export const setPoNumber = (value: string) => {
	poNumber.set(value) // use the set method to update the value of the store
}

export const setPalletNumber = (value: number) => {
	palletNumber.set(value) // use the set method to update the value of the store
}	