<script>
  import {bundle} from "~/productBundles/store.js";

  export let product
  export let complete = false
  // Add the product to the bundle store and assign the store to trigger
  // reactivity.
  const addProduct = () => {
    const newBundle = [...$bundle, product]
    bundle.save(newBundle)
  }
</script>

<div class:complete class="product-box" data-product-id="{product.id}">
  <div class="product-details">
    <div class="product-image">
      <img src="{product.image}" alt="{product.title}" />
    </div>
    <div class="product-title">
      {product.title}
    </div>
    <div class="product-price">
      ${product.price}
    </div>
  </div>
  <div class="btn-area">
    <button type="button" disabled={complete} class="btn btn-bundle" on:click={addProduct}>
      Add to Bundle
    </button>
  </div>
</div>

<style>
  .product-box {
      display: block;
      border: solid 5px #ccc;
      border-radius: 10px;
      padding: 1em;
      max-width: 250px;
      text-align: center;
      display: flex;
      flex-direction: column;
  }

  .product-box.complete {
    opacity: 0.6;
  }

  .product-price {
    font-weight: bold;
    font-size: 2em;
  }

  .product-box .btn-area {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
  }

  .product-box .product-title {
      font-weight: 800;
      text-align: center;
  }

  .btn-bundle {
    border-radius: 30px;
    font-size: .7rem;
    white-space: nowrap;
    line-height: 1rem;
    text-transform: uppercase;
  }

  .btn-bundle:hover {
    background-color: var(--button-custom-hover-color, darkgray);
    transition: .2s;
  }
  
  .product-details{
    flex: 1 0 auto;
  }

</style>
