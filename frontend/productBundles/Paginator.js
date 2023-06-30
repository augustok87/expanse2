import settings from "@/productBundles/settings.js";

class Paginator {
  constructor(items= [], currentPage=0) {
    this.items = items
    this.productsPerPage = settings.productsPerPage
    this.currentPage = currentPage
  }

  /*
  0-based offset, where the pagination should start.
  The -1 is used to apply to any non-zero offset.
  */
  get offset() {
    const baseOffset = (this.currentPage * this.productsPerPage) - 1
    return Math.max(baseOffset, 0)
  }

  get pageEnd() {
    return this.offset + this.productsPerPage
  }

  get currentItems() {
    const items = this.items.slice(this.offset, this.pageEnd)
    return items
  }

  get itemCount() {
    return this.items.length
  }

  get pageCount() {
    return Math.ceil(this.itemCount / this.productsPerPage)
  }

  get showPages() {
    return this.pageCount > 1 ? true : false
  }

}

export default Paginator
