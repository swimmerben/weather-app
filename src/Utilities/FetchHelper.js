function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
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

export {fetchUrlWithCb};