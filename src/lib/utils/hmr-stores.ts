// Customized HMR-safe stores
// Based off https://github.com/svitejs/svite/blob/ddec6b9/packages/playground/hmr/src/stores/hmr-stores.js
import { writable } from 'svelte/store'

// declare the type of stores
type Stores = Record<string, import('svelte/store').Writable<any>>

// initialize stores as an empty object
let stores: Stores = {}

// define a generic function to get or create a store
export function getStore<T>(id: string, initialValue: T): import('svelte/store').Writable<T> {
	return stores[id] || (stores[id] = writable(initialValue))
}

// preserve the store across HMR updates
if (import.meta.hot) {
	if (import.meta.hot.data.stores) {
		stores = import.meta.hot.data.stores as Stores
	}
	import.meta.hot.accept()
	import.meta.hot.dispose(() => {
		import.meta.hot.data.stores = stores
	})
}