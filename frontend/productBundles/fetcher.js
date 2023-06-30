import { request, gql } from 'graphql-request'
import settings from "@/productBundles/settings.js";
/*
* Using the graphql-request library for graphql requests.
* https://github.com/jasonkuhrt/graphql-request
*/

/*
* The storefront api [public] access token for fetching data.
* https://admin.shopify.com/store/dev-expanse-bootstrap/settings/apps/development/44845432833/api_credentials
*/
const apiUrl = `https://${settings.storeUrl}/api/2023-04/graphql.json`
const requestVars = {}
const requestHeaders = {
  "X-Shopify-Storefront-Access-Token": settings.accessToken
}

/*
* We have no max for fetching, as we have no api for variants only, and each
* product may have an unknown number of variants. Technicaly we want to show
* the variants, and not just the products.
*/
const maxPerPage = 250


const collectionQuery = gql`
{
  collection(handle: "${settings.bundleCollectionHandle}") {
    handle
    id
    products(first: ${maxPerPage}) {
      edges {
        node {
          id
          title
          availableForSale
          images(first: 1) {
            edges {
              node {
                id
                height
                width
                url
              }
            }
          }
          variants(first: ${maxPerPage}) {
            edges {
              node {
                id
                availableForSale
                title
                price {
                  amount
                  currencyCode
                }
                image {
                  id
                  url
                  height
                  width                      
                }
              }
            }
          }
        }
      }
    }
  }  
}
`

const getCollection = async () => {
  try {
    const response = await request(apiUrl, collectionQuery, requestVars, requestHeaders)
    return response.collection
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

}

export { getCollection }
