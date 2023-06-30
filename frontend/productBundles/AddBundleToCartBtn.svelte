<script>
  import {bundle} from "~/productBundles/store.js";

  // Uses the Cart API.
  // https://shopify.dev/docs/api/ajax/reference/cart
  const cartAddUrl = `${window.Shopify.routes.root}cart/add.js`
  const cartDrawerElem = document.querySelector('#HeaderCart')

  const lineItemData = () => {
    return $bundle.map((prod) => {
      return {
        id: prod.shortId,
        quantity: 1,
        properties: {
          "Bundled Item": 'Added as bundle'
        }
      }
    })
  }
  const showCart = () => {
    // Only good for archetype themes. Will cause the cart counter to update.
    // https://archetypethemes.co/blogs/expanse/javascript-events-for-developers
    document.dispatchEvent(new CustomEvent('cart:build'));
    cartDrawerElem.classList.add('is-active')
  }

  const addBundleToCart = async () => {
    const data = {items: lineItemData()}
    const response = await fetch(
      cartAddUrl,
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    showCart()
  }
</script>

<button type="button" class="btn add-to-cart" on:click={addBundleToCart}>
  Add Bundle to Cart
</button>


<style>
  .add-to-cart {
    margin-bottom: 10px;
  }
</style>
