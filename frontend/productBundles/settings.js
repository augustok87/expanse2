// FORGE_DATA is a global variable that should have our settings loaded.
const settings = FORGE_DATA.bundle_product_settings
const DEFAULT_BUNDLE_COUNT = 3
/*
* This is the storefront api access token for the app.
* Ensure that the environment variable is available in the .env file.
* https://v2.vitejs.dev/guide/env-and-mode.html#env-files
*/
const getAccessToken = () => {
  const token = import.meta.env.VITE_PRODUCT_BUNDLE_APP_API_TOKEN
  if (!token) throw('VITE_PRODUCT_BUNDLE_APP_API_TOKEN must be in your .env file')

  return token
}

const accessToken = getAccessToken()

const storeUrl = Shopify.shop
const bundleCount = settings.product_bundle_count || DEFAULT_BUNDLE_COUNT
const bundleCollectionHandle = settings.bundle_collection
if(!bundleCollectionHandle) throw('No collection was chosen to bundle from.')

const showTotal = settings.show_total

const maxImageWidth = 300
const productsPerPage = settings.products_per_page || 10

export default {
accessToken,
storeUrl,
bundleCount,
maxImageWidth,
productsPerPage,
bundleCollectionHandle,
showTotal
}
