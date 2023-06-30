import { defineConfig } from 'vite'
import postcss from './postcss.config.js';
// These are the 3 vite packages that we can use (https://shopify-vite.barrelny.com/):
import shopify from "vite-plugin-shopify";
import { svelte } from '@sveltejs/vite-plugin-svelte';

// This package has not been configured yet.
// import shopifyThemeSettings from 'vite-plugin-shopify-theme-settings'

// In this configuration file, we set the prefix to be `vite-`, but you can change it to whatever you want. Then, in the rollupOptions object, we use the assetFileNames, chunkFileNames, and entryFileNames options to prefix the names of the built assets.
//     To remove only the prefixed assets during the build process, we set the assetsInclude option to a regular expression that matches any asset whose name starts with the prefix.
//     Note that we also set assetsInlineLimit to 0 and assetsDir to an empty string to prevent Vite from processing any assets that are not explicitly included in the assetsInclude array.
//     With this configuration, when you run npm run build, Vite will prefix the names of all the built assets with the prefix you specified, and then remove only those assets that have the prefix.
const assetPrefix = 'vite-'; // change this to your desired prefix for all built assets.

export default defineConfig({

  plugins: [
    // "Shopify" plugin enables entrypoint detection, smart generation of script and link tags, and support for Shopify CDN-hosted assets
    shopify({
      // Root path to your Shopify theme directory (location of snippets, sections, templates, etc.)
      themeRoot: "./",
      // Front-end source code directory
      sourceCodeDir: "frontend",
      // Front-end entry points directory
      entrypointsDir: "frontend/entrypoints",
    }),
    svelte()
  ],
  css: {
    postcss
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: `${assetPrefix}[name].[ext]`,
        chunkFileNames: `${assetPrefix}[name]-[hash].js`,
        entryFileNames: `${assetPrefix}[name].js`
      }
    },
    manifest: true,
    // outDir: '',
    emptyOutDir: false,
    // Exclude assets that do not have the prefix from being removed during build
    assetsInlineLimit: 0,
    assetsInclude: [
      new RegExp(`^${assetPrefix}`)
    ]
  }
})
