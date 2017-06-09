import fetch from 'isomorphic-fetch'

export async function fetchExchangeRates(base, target) {
  const params = {
    env: 'store://datatables.org/alltableswithkeys',
    q: buildQuery(base, target),
    format: 'json'
  }

  return fetch(`https://query.yahooapis.com/v1/public/yql?${encode(params)}`)
    .then(response => response.json())
    .then(data =>
      data.query.results.rate.reduce((result, item) => {
        const code = item['Name'].split('/')[1]
        result[code] = parseFloat(item['Rate'])
        return result
      }, {})
    )
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
