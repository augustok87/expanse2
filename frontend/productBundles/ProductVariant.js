import {parseId} from "@/productBundles/utils.js";
import settings from "@/productBundles/settings.js";


const SHOPIFY_DEFAULT_TITLE_MATCHER = /^default\s+title$/i

class ProductVariant {
  constructor(attribs={}) {
    this.attribs = attribs
  }

  get id() {
    return this.attribs.id
  }

  // Find the integer ID only of the product.
  get shortId() {
    return parseId(this.id)
  }

  get availableForSale() {
    return this.attribs.availableForSale
  }

  /*
  * We must accommodate for Shopify's "Default Title". If the variant has this
  * as a title, then we must use the main product title instead. This attribute
  * must be passed in with the attributes, outside of the standard API.
  * https://community.shopify.com/c/shopify-apis-and-sdks/simple-products-get-variants-with-name-quot-default-title-quot/td-p/371189
  */
  get title() {
    const mainTitle = this.attribs.main_product_title
    if(SHOPIFY_DEFAULT_TITLE_MATCHER.test(this.attribs.title)) {
      return mainTitle
    }

    return `${mainTitle}: ${this.attribs.title}`
  }

  get image() {
    const url = new URL(this.attribs.image.url)
    url.searchParams.append('width', settings.maxImageWidth)
    return url.toString()
  }

  /*
  * Return a floating point for the string given
  */
  get price() {
    return parseFloat(this.attribs.price.amount)
  }
}


export default ProductVariant
