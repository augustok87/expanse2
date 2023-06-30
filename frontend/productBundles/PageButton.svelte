<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  export let page = 0
  export let buttonText = page + 1
  export let currentPage = 0
  let current = false


  const buttonClass = () => {
    const isInt = !!parseInt(buttonText)
    if(isInt) return "page-btn"

    return "arrow-btn"
  }
  /*
  * Set the currentPage to whatever this page number is.
  */
  const setCurrentPage = () => {
    console.log("setting the currentPage to page", {page, currentPage})
    dispatch('set-current-page', {
      currentPage: page
    })
  }

  $: {
    current = page === currentPage
  }
</script>


<button class="{buttonClass()}" class:current disabled={current} on:click={setCurrentPage}>
  {buttonText}
</button>


<style>
  .page-btn {
    display: inline-block;
    font-size: 1.5em;
    width: 2em;
    margin: 0 2px;
    border: solid 2px #333;
    background: white;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
  }

  .page-btn:hover, .page-btn.current {
    background: #333;
    color: white;
  }

  .arrow-btn {
    font-size: 1.5em;
    font-weight: bold;
    cursor: pointer;
  }

  .page-btn.current {
    cursor: default;
  }

</style>
