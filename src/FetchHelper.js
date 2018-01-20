function checkStatus(response) {
  console.log("checking status")
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log("got here uh oh")
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function fetchUrlWithCb(url, cb, err) {
  fetch(url, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(err)
}

const FetchHelper = { checkStatus, parseJSON , fetchUrlWithCb}
export {fetchUrlWithCb};