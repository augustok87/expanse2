import { writable } from 'svelte/store';
import {storageManager} from "@/productBundles/StorageManager.js";

function createBundleStore() {
  const { subscribe, set } = writable([]);

  return {
    subscribe,
    set,
    save: (products=[]) => {
      set(products)
      storageManager.save(products)
      return products
    },
    load: () => {
      const products = storageManager.load()
      set(products)
    }
  }
}


export const bundle = createBundleStore()
