import ProductVariant from "@/productBundles/ProductVariant.js";

class ProductVariantParser {
  constructor(productData=[]) {
    this.productData = productData
  }

  variantData() {
    const attribs = this.productData.map((product) => {
      return product.node.variants.edges.map((variantData) => {
        return Object.assign(variantData.node, {main_product_title: product.node.title})
      })
    })
    const flatAttribs = attribs.flat()
    return flatAttribs.filter((variant) => variant.availableForSale)
  }

  variants() {
    const data = this.variantData()
    return data.map((attribs) => new ProductVariant(attribs))
  }
}

export default ProductVariantParser
