# Setup

There are now two ways to work with Shopify Themes! 

1. Using `shopify-vite` front-end tooling + shopify cli (https://shopify-vite.barrelny.com/)
2. Using only the shopify cli

**Use #1 (shopify-vite + shopify cli) in order to do any of the following:**

- use installed npm modules to augment your code 
- modularize your code per snippet/section
- create browser-compatible, minified JS
- use sass and other transpilers to take advantage of Sass or PostCss when writing css
- use transpilers to write in typescript
- have good code organization
- bring in and use other css libraries (like tailwind)
- take advantage of environment variables pulled from .env file
- set up and run unit tests (coming)
- do anything you would want to do with a build process. Svelte? Vue? Preact? (coming)

To find out more about the
[shopify-vite plugin, click here](https://github.com/barrel/shopify-vite/tree/main/packages/vite-plugin-shopify).  

**Use #2 (just shopify cli) to edit and adjust themes in the traditional way.** 

## Before we start - the site password

In order to keep people out of the public-facing dev store, it is password-protected. 
You will also need this password when developing. 

To get the password for the dev-store go to:
```
Shopify Admin  > Online Store > Preferences > Restrict Store Access > Password
```

## The `shopify-vite` (preferred) way of development

### Set up your .env file

For initial setup for a store, you will need to have a `.env` file set up with 
the store ENV variable. 

Add `SHOPIFY_FLAG_STORE=<your store>` to your `.env` file. 

See the `.env.example` file as an example.

### Install the package modules

You will have to have `npm` installed on your machine. 
Optionally, for faster development, you will likely want to also have 
[`pnpm` installed](https://pnpm.io/installation) as well. 

`pnpm install` (preferred)
or
`npm install`

### Start developing!

To run the dev server:

`pnpm run dev`

This will launch BOTH `vite` and `shopify cli`. 
Changes you make in the theme will instantly be seen. 

### Ready for build and push to github

There is one extra step you will want to take. 

```
pnpm run vite:build
```

Will build all your assets for you. 

Once you build the assets, your vite server will serve out those built assets, 
until you restart your dev server. Running the dev server automatically removes all your [previously built] assets.

```
pnpm run start
```

## Coding with shopify-vite plugin

The general gist of it is that you have a `fronted` directory and a `modules` 
directory. 

#### Files in `frontend` and `frontend/entrypoints`

Put js and css in the `frontend` directory for common libraries that you want 
to use across the site. You can split up these libraries into their own 
directories and directory structures. 
Any js, ts, or css that goes in `frontend/entrypoints` can load anything else 
from directories within `frontend`! This allows us to keep our code organized.

You can then reference these assets using the `vite-tag` snippet.
 
```liquid
{{ render 'vite-tag' with 'custom_asset' }}
```

To find out more about this, [click here](https://github.com/barrel/shopify-vite/tree/main/packages/vite-plugin-shopify#usage).
The link also has an 
[example theme](https://github.com/barrel/shopify-vite/tree/main/themes/vite-shopify-example).

Check out our very basic example using the `shopify_expanse_theme_bootstrap_dev`
[theme here](https://github.com/FoundryBrands/shopify_expanse_theme_bootstrap/tree/examples/vite-shopify-plugin).

## Traditional development (only shopify cli)

Below are the [traditional] steps to develop only using the shopify cli.

### Ensure the Shopify CLI is installed on your machine
https://shopify.dev/themes/tools/cli/install

### Login via the shopify CLI
Login command to Shopify Store:

```
shopify theme dev --store=dev-expanse-bootstrap

To get the password for the dev-store go to:
Shopify Admin  > Online Store > Preferences > Restrict Store Access > Password
```

After you have logged in, you can simply run:

```
shopify theme dev
```
within your branch in order to preview your local changes.

## Useful Shopify references

- [Cheatsheet for Liquid within Shopify][2] will help you see what objects are
available to you in liquid.
- [Shopify's Liquid API Docs][3] will show you all available Liquid objects.

## Style Guide

Until we can set up a linter to do this for us, please use the following 
styles when working with code (snippets, css, etc) that is purely ours 
and not the theme's. 

- 2-space indent for all CSS, JS, and HTML.

## Best Practices

### CSS

- Avoid modifying the `theme.css` file. Modify the custom-theme.css file instead.
- Put custom css in your `custom-checkout.css` file for pages that use the `checkout` layout.

## Javascript

- For common javascript utilities that you will want to 
use throughout the layout, use the `custom-theme.js` 
or the `custom-checkout.js` file.
- For other javascript, employ a snippet. See [snippet guidelines](#snippets).

## Snippets

Sometimes it is better to use a snippet than to put javascript into the common 
files. Snippets can also have additional html and styling; they may not solely 
be javascript.

**Advantages**

Via [Liquid conditionals][1], we can keep whole snippets from being rendered 
at all on the page. This allows us to keep our page size smaller. 

**Disadvantages**

Snippets are inline and can never be `defered`. A snippet in a layout, for example, 
should be placed at the bottom of the page, just above the `</html>` tag. 
When the page is loading, the snippet will not block the visual HTML elements
from loading while the snippet is loading. This gives quicker visual feedback to
the user. 

In templates, there is no preference as to where the snippet should be placed, 
as a template is usually a smaller section of HTML than say, a layout. 
This means placement will not change much in the way of speed or visual feedback
to the user. 

**If you use a snippet:**

- Put the snippet snippet in a [conditional liquid tag][1] that looks at an 
objects handle to determine if the snippet should be rendered.
- If your snippet interacts with the DOM in any way, ensure that it the code that
traverses the DOM is in a `DOMContentLoaded` listener.
- If the snippet is in a layout, add the snippet before the closing html tag at 
the end of the layout. You only have to worry about this within layouts.
- Make your snippet name something that describes what it does and where it is.
e.g. "header-menu-delayed-hover"
- For any change to a liquid file, we should specify the change in a comment:

### Attribution for snippets
When `render`ing a snippet, say, in a layout or template:

```
{% comment %} Added by <github-username> on <YYYY-MM-DD> for [<JIRA-ticket-number>] {% endcomment %}
```

### Checkout snippets

When using checkout snippets, it is good to determine if you need to use a 
"killswitch" based on the impact of your snippet. 
A killswitch is a conditional render based on the settings.
You can find out [more about them here][4].

Killswitches can be employed in the admin, and can be useful if we find out 
that a piece of code we've put into the checkout is inadvertently keeping 
users from checking out. 

### Overall best practices

Here are some [snippets best practices to review][1].

## Git

Before you make a PR, merge (or rebase) off of `main` first. 
This ensures you have the latest changes from the `main` branch.

```
git checkout main
git pull
git checkout <JIRA-ticket-number>/<my-dev-branch>
git merge main
```

**When releasing:**

Merge `main` into the current and all future release branches (e.g `release/xxx`).
This instantly puts all changes up onto the current production site and carries it forward for any future scheduled releases.


[1]: https://www.shopify.com/partners/blog/88186566-tips-for-using-snippets-in-your-shopify-theme
[2]: https://www.shopify.com/partners/shopify-cheat-sheet
[3]: https://shopify.dev/api/liquid
[4]: https://shopify.dev/themes/architecture/layouts/checkout-liquid/customize-checkout
