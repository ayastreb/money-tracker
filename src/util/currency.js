import fetch from 'isomorphic-fetch'

export async function fetchExchangeRates(base, target) {
  const params = {
    env: 'store://datatables.org/alltableswithkeys',
    q: buildQuery(base, target),
    format: 'json'
  }

  return fetch(`https://query.yahooapis.com/v1/public/yql?${encode(params)}`)
    .then(body => body.json())
    .then(response => {
      const exchangeRate = {}
      for (let item of response.query.results.rate){
        const code = item['Name'].split('/')[1]
        exchangeRate[code] = parseFloat(item['Rate'])
      }

      return exchangeRate
    })
}

function buildQuery(base, target) {
  const pairs = target.map(code => `${base}${code}`)
  return `SELECT Name,Rate FROM yahoo.finance.xchange WHERE pair = "${pairs.join(',')}"`
}

function encode(params) {
  return Object.keys(params)
    .map(key => [key, params[key]].map(encodeURIComponent).join('='))
    .join('&')
}
