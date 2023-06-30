import ProductVariant from "@/productBundles/ProductVariant.js";
const STORAGE_KEY = 'FOUNDRY_BUNDLED_PRODUCTS'


const attribsForProducts = (products=[]) => {
  return products.map((prod) => prod.attribs)
}

class StorageManager {
  save(products= []) {
    const data = attribsForProducts(products)
    const strData = JSON.stringify(data)
    window.sessionStorage.setItem(STORAGE_KEY, strData)
  }

  read() {
    const strData = window.sessionStorage.getItem(STORAGE_KEY) || '[]'
    return JSON.parse(strData)
  }

  /*
  * @return [Array<Product>]
  */
  load() {
    const data = this.read()
    return data.map((attribs) => new ProductVariant(attribs))
  }
}

export const storageManager = new StorageManager()
