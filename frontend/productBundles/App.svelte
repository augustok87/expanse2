<script>
  import {onMount} from "svelte"
  import settings from '@/productBundles/settings.js'
  import {bundle} from "@/productBundles/store.js";
  import {getCollection} from "@/productBundles/fetcher.js"
  import Paginator from "@/productBundles/Paginator.js";
  import ProductVariantParser from "@/productBundles/ProductVariantParser.js";
  import ProductBox from "@/productBundles/ProductBox.svelte";
  import SelectedProductThumbnail from "@/productBundles/SelectedProductThumbnail.svelte";
  import AddBundleToCartBtn from "@/productBundles/AddBundleToCartBtn.svelte";
  import PageButton from "@/productBundles/PageButton.svelte";

  let loading = true
  let products = []
  let allProducts = []
  let complete = false
  let leftToGo = settings.bundleCount
  let paginator
  let currentPage = 0
  let runningTotal = 0
  /*
  * Set the `currentPage` variable. Triggered by an event dispatched from a
  * child component.
  */
  const setCurrentPage = (e) => {
    currentPage = e.detail.currentPage
  }

  const getTotalForBundle = (selectedBundle) => {
    const total = selectedBundle.reduce((sum, variant) => {
      return sum + variant.price;
    }, 0);
    return total.toFixed(2); //Show up to 2 decimals
  };

  onMount(async () => {
    bundle.load()
    const collectionData = await getCollection()
    const parser = new ProductVariantParser(collectionData.products.edges)
    allProducts = parser.variants()
    loading = false
  })

  $: {
    complete = $bundle.length >= settings.bundleCount
    leftToGo = settings.bundleCount - $bundle.length
    paginator = new Paginator(allProducts, currentPage)
    products = paginator.currentItems
    runningTotal = getTotalForBundle($bundle)
  }
</script>

<div id="bundle-products-container">
  {#if loading}
    <div id="loading-products">...loading...</div>
  {:else}
    <div class="bundler-title">
      Bundle {settings.bundleCount} Products
    </div>
    <div class="product-box-container">
      <div class="product-box-rows">
        {#each products as product}
          <ProductBox product={product} complete={complete} />
        {/each}
      </div>
      {#if paginator.showPages}
        <div class="page-buttons">
          {#if currentPage > 0}
            <PageButton page={currentPage - 1} {currentPage} buttonText="&laquo;" on:set-current-page={setCurrentPage} />
          {/if}
          {#each Array(paginator.pageCount) as _, i}
            <PageButton page={i} {currentPage} on:set-current-page={setCurrentPage} />
          {/each}
          {#if currentPage + 1 < paginator.pageCount}
            <PageButton page={currentPage + 1} {currentPage} buttonText="&raquo;" on:set-current-page={setCurrentPage} />
          {/if}
        </div>
      {/if}
      <div id="sticky-bundle-container">
        {#if complete}
          <AddBundleToCartBtn />
        {:else}
          <div class="selected-bundle-title">Your Bundle</div>
          <div class="selected-bundle-status">
            Add <span class="left-to-go">{leftToGo}</span> item(s) to complete your bundle
          </div>
        {/if}
        <div class="selected-bundle-products">
          {#each Array(settings.bundleCount) as _, i}
            <SelectedProductThumbnail bundleIndex={i} />
          {/each}
        </div>
        {#if settings.showTotal && runningTotal}
          <div class="running-total">
            TOTAL: ${runningTotal}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>


<style>
  #loading-products {
    font-weight: bold;
    font-size: 3em;
    text-align: center;
  }

  .left-to-go {
    font-weight: bold;
    font-size: 1.2em;
  }

  .bundler-title {
    font-size: 3em;
    text-align: center;
  }

  .selected-bundle-title {
    font-size: 1.8em;
    font-weight: bold;
  }

  .selected-bundle-status {
    font-size: 1.2em;
    margin-bottom: 3px;
  }

  #bundle-products-container {
    position: relative;
  }

  #sticky-bundle-container {
    position: sticky;
    bottom: 0px;
    border-top: solid 2px #666;
    padding: 10px 0;
    background: white;
    width: 100%;
    text-align: center;
  }

  .selected-bundle-products {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .product-box-rows {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .product-box-container {
    justify-content: center;
  }

  .page-buttons {
    text-align: center;
    position: sticky;
    bottom: 0px;
    margin: 1em 0;
  }

  .running-total {
    font-weight: bold;
    font-size: 1.8em;
  }
</style>
