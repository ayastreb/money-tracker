import fetch from 'isomorphic-fetch'

export async function fetchExchangeRates(base, target) {
  const params = {
    q: buildQuery(base, target),
    env: 'store://datatables.org/alltableswithkeys',
    format: 'json'
  }

  return fetch(`https://query.yahooapis.com/v1/public/yql?${encode(params)}`)
    .then(body => body.json())
    .then(response =>
      response.query.results.rate.reduce((result, row) => {
        result[row.id.substring(3)] = parseFloat(row['Rate'])
        return result
      }, {})
    )
}

function buildQuery(base, target) {
  const pairs = target.map(code => `${base}${code}`)
  return `SELECT id,Rate FROM yahoo.finance.xchange WHERE pair = "${pairs.join(',')}"`
}

function encode(params) {
  return Object.keys(params)
    .map(key => [key, params[key]].map(encodeURIComponent).join('='))
    .join('&')
}
