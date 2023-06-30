import App from '@/productBundles/App.svelte';

const target = document.querySelector('#product-bundle-app')

const app = new App({
  target: target
});

export default app;
