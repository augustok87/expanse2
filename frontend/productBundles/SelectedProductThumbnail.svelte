<script>
  import {bundle} from "@/productBundles/store.js";
  export let bundleIndex = 0

  let product
  let image
  let title
  let bgStyle

  /*
  * Reset the bundle to have everything but this product.
  * Will only remove one instance of the product (in the event that the product
  * is bundled multiple times)
  */
  const removeItem = () => {
    let removed = false
    const newBundle = $bundle.filter((prod) => {
      if (!removed && prod.id === product.id) {
        removed = true
        return false
      }

      return true
    })
    bundle.save(newBundle)
  }

  $: {
    product = $bundle[bundleIndex]
    image = product?.image || ''
    title = product?.title || ''
    if(image) {
      bgStyle = `background-image: url(${image});`
    } else {
      bgStyle = ''
    }
  }
</script>

<div class="selected-product-box">
  {#if product}
    <button class="remove-btn" on:click={removeItem}>&times;</button>
  {/if}
  <div class="selected-product-image"
       style="{bgStyle}"
       role="img"
       alt="{title}"
       title="{title}"
       aria-label="{title}"></div>
</div>

<style>
  .remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0px 3px;
    line-height: 1em;
    border-radius: 0 5px 0 5px;
    background: #666;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
    cursor: pointer;
  }

  .remove-btn:hover {
    background: #333;
  }

  .selected-product-image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
  }

  .selected-product-box {
    position: relative;
    height: 100px;
    width: 100px;
    overflow: hidden;
    border: solid 5px #ccc;
    border-radius: 8px;
    background: #eee;
  }
</style>
