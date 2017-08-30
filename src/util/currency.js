import fetch from 'isomorphic-fetch'

export function fetchExchangeRates(base, target) {
  if (!target.includes(base)) target.push(base)
  const exchangeServiceUrl = process.env.REACT_APP_XCHANGE_URL
  const pairs = target.map(code => `${base}${code}`)

  return fetch(`${exchangeServiceUrl}?pairs=${pairs.join(',')}`)
    .then(body => body.json())
    .then(response =>
      response.rates.reduce((result, row) => {
        result[row.id.substring(3)] = parseFloat(row['rate'])
        return result
      }, {})
    )
}
