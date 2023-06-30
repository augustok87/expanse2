
/*
* Parse the integer id from a shopify GID for an item.
*/
const parseId = (gid) => {
  if (!gid) return

  const strId = gid.match(/(\d+)$/)?.[0]
  if(!strId) return

  return parseInt(strId)
}

export {parseId}
