const fetch = require('node-fetch');
const bungieRoot = 'https://bungie.net/';

async function getBungieRequest(url, token, params = null){
  return getRequest(bungieRoot, url, token, params);
}

async function getRequest(baseUrl, url, token, params = null, method = 'GET') {

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': token
    }
  };

  if (params) {
    if (method === 'GET') {
      url += '/?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(baseUrl + url, options);

  if (response.status !== 200) {
    return generateErrorResponse('The server responded with an unexpected status.', response);
  }

  return response.json();
}

function objectToQueryString(obj) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

function generateErrorResponse(message, error = {}) {
  console.log(error);
  return {
    status : 'error',
    message
  };
}

module.exports = { getBungieRequest };