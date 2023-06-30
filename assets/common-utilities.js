/*
No script tags needed here. Can be simply javascript.
This should be used for JS utility methods accessed via FORGE_UTILS.
These methods are not deferred, so available when DOM ContentLoaded.
*/

const FORGE_DATA = {};
const FORGE_UTILS = (() => {
  const urlHistory = () => {
    // Being used as a Session Storage Key at "store-last-visited-page.liquid"
    const URL_HISTORY_SESSION_KEY = "FOUNDRY_URL_HISTORY",
      URL_HISTORY_COUNT = 10;

    const getHistory = () => {
      const historyJSON =
        window.sessionStorage.getItem(URL_HISTORY_SESSION_KEY) || "[]";
      return JSON.parse(historyJSON);
    };

    // History comes from `FORGE_UTILS` object from `custom-utilities.js`
    // Retrieves URL list data or creates an emtpy array.
    const pushURL = () => {
      const history = getHistory();

      // Add the last visited URL path at the beginning of `history` array.
      history.unshift(window.location.pathname);

      // Slice history to only 10 items, then stringify
      window.sessionStorage.setItem(
        URL_HISTORY_SESSION_KEY,
        _jsonifyHistory(history)
      );
    };

    const _jsonifyHistory = (history = []) => {
      return JSON.stringify(history.slice(0, URL_HISTORY_COUNT));
    };

    return {
      pushURL,
      getHistory,
    };
  };

  /*
  * This global utility is to be used to store [liquid] data into a global
  * js variable `FORGE_DATA` for use at run-time.
  * @param {string} baseDataKey - the data key to set in FORGE_DATA
  * @param {object} data - the data object [presumably from liquid]
  */
  const setForgeData = (baseDataKey, data) => {
    const dataKey = _getForgeDataKey(baseDataKey)
    FORGE_DATA[dataKey] = data
  }

  /*  PRIVATE METHODS */

  /*
  * Find the first key in `FORGE_DATA` with the `baseDataKey` and then iterate
  * the suffix of the key until a suitable [sequential] property key is found that
  * does not already have a value.
  * @param {string} baseDataKey - the data key to set in `FORGE_DATA`
  */
  const _getForgeDataKey = (baseDataKey) => {
    let currentDataKey = baseDataKey
    let dataSuffix = 1
    while (FORGE_DATA[currentDataKey]) {
      currentDataKey = baseDataKey + `_${dataSuffix}`
      dataSuffix++
    }
    return currentDataKey
  }


  // This is what FORGE_UTILS will be set to
  return {
    urlHistory: urlHistory(),
    setForgeData
  }
})();
