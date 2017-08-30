/**
 * This webtask is used to fetch current exchange rate for any given currency pair.
 * It gets base exchange rate data from currencylayer.com and caches it in webtask storage for 1 hour.
 * It uses cross rate for pairs where base is not USD.
 *
 * Usage:
 * HTTP GET https://wt-e9c9a7a436fcd9273a7f8890849dae65-0.run.webtask.io/currency-exchange?pairs=USDEUR,EURUSD,USDJPY,EURJPY
 * Response:
 * {
 *   "ok": "true",
 *   "rates": [
 *      {
 *        "id": "USDEUR",
 *        "rate": "0.834303"
 *      },
 *      {
 *        "id": "EURUSD",
 *        "rate": "1.198605"
 *      },
 *      {
 *        "id": "USDJPY",
 *        "rate": "109.678001"
 *      },
 *      {
 *        "id": "EURJPY",
 *        "rate": "131.460634"
 *      }
 *   ]
 * }
 */
module.exports = function(context, respond) {
  const request = require('request')
  const BASE = 'USD'
  const pairs = context.query.pairs.toUpperCase().split(',')

  return getBaseRate()
    .then(baseRate =>
      respond(null, {
        ok: true,
        rates: pairs.map(pair => getRateForPair(baseRate, pair))
      })
    )
    .catch(error => respond(error))

  /**
   * Get exchange rate for given pair using given base exchange rate.
   * Use cross rate if pair's base is not equal to rate base (USD).
   *
   * @param {object} baseRate - dict { USD: 1, EUR: 0.834499, ... }
   * @param {string} pair - "USDEUR", "EURUSD", "EURJPY", etc
   * @return {object} dict { id: "USDEUR", rate: "0.834499" }
   */
  function getRateForPair(baseRate, pair) {
    if (pair.length != 6) {
      throw new Error(
        `Invalid pair "${pair}". Must be 6-char string, e.g. "USDEUR"`
      )
    }

    const source = pair.substr(0, 3)
    const target = pair.substr(3, 3)

    if (!baseRate[source]) throw new Error(`Unknown currency code "${source}"`)
    if (!baseRate[target]) throw new Error(`Unknown currency code "${target}"`)

    return {
      id: pair,
      rate: Number(
        source === BASE
          ? baseRate[target]
          : 1 / baseRate[source] * baseRate[target]
      ).toFixed(6)
    }
  }

  /**
   * Get exchange rate for base currency (USD).
   *
   * @return {object} dict { USD: 1, EUR: 0.834499, ... }
   */
  function getBaseRate() {
    return fetchCachedRate()
      .then(rate => rate, error => fetchLiveRate())
      .then(checkCachedRateAge)
      .then(convertRate)
  }

  /**
   * Read cached rate from webtask storage.
   *
   * @see https://webtask.io/docs/storage
   * @return {Promise}
   */
  function fetchCachedRate() {
    return new Promise((resolve, reject) => {
      context.storage.get((error, rate) => {
        if (error) return reject(error)
        if (rate === undefined) return reject()

        resolve(rate)
      })
    })
  }

  /**
   * Fetch base exchange rate from CurrencyLayer live API.
   * Fallback to cached rate if API is not available.
   *
   * @see https://currencylayer.com/documentation
   * @see https://webtask.io/docs/editor/secrets
   * @return {Promise}
   */
  function fetchLiveRate() {
    return new Promise(resolve => {
      const apiKey = context.secrets.apiKey
      request(
        {
          method: 'GET',
          uri: `http://apilayer.net/api/live?access_key=${apiKey}`,
          json: true
        },
        (error, response, body) => {
          if (error || !body.success) {
            fetchCachedRate().then(rate => resolve(rate))
          } else {
            writeCachedRate(body).then(() => resolve(body))
          }
        }
      )
    })
  }

  /**
   * Write given rate to webtask cache.
   *
   * @see https://webtask.io/docs/storage
   * @param {object} rate
   * @return {Promise}
   */
  function writeCachedRate(rate) {
    return new Promise((resolve, reject) => {
      context.storage.set(
        rate,
        { force: 1 },
        error => (error ? reject(error) : resolve())
      )
    })
  }

  /**
   * Validate cached rate expiry date.
   *
   * @param {object} rate
   */
  function checkCachedRateAge(rate) {
    const expiryDate = Math.floor(Date.now() / 1000) - 3600
    return rate.timestamp < expiryDate ? fetchLiveRate() : rate
  }

  /**
   * Convert response from API service to internal rate object.
   *
   * @param {object} dict { ..., quotes: { USDUSD: 1, USDEUR: 0.834499, ... } }
   * @return {object} dict { USD: 1, EUR: 0.834499, ... }
   */
  function convertRate(rate) {
    return Object.keys(rate.quotes).reduce((acc, pair) => {
      const code = pair.substr(3, 3)
      acc[code] = rate.quotes[pair]
      return acc
    }, {})
  }
}
