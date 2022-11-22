'use strict';
const http = require('http');
const fs = require('fs');

module.exports.currencyExchange = async ({ queryStringParameters }) => {
  const BASE = 'USD';
  const pairs = queryStringParameters?.pairs?.toUpperCase().split(',') || [];

  try {
    const exchangeRate = await getExchangeRateCached();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ok: true,
          rates: pairs.map(pair => getRateForPair(exchangeRate, pair))
        },
        null,
        2
      )
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    };
  }

  async function getExchangeRateCached() {
    const now = new Date();
    const cache = `/tmp/data-${now.getFullYear()}-${now.getMonth()}-${now.getDay()}.json`;
    if (fs.existsSync(cache)) {
      return JSON.parse(fs.readFileSync(cache, { encoding: 'utf-8' }));
    }

    const data = await getExchangeRate();
    fs.writeFileSync(cache, JSON.stringify(data), { encoding: 'utf-8' });

    return data;
  }

  /**
   * Fetch exchange rate from API for all available currencies.
   *
   * @returns {
   *   timestamp: number;
   *   quotes: {
   *     USDJPY: 140.01
   *   }
   * }
   */
  function getExchangeRate() {
    return new Promise((resolve, reject) => {
      let data = '';
      const key = process.env.API_KEY;
      if (!key) {
        return reject('API key is missing!');
      }

      const req = http.get(
        `http://apilayer.net/api/live?access_key=${key}`,
        function(res) {
          res.on('data', chunk => {
            data += chunk;
          });
          res.on('end', () => {
            const rate = JSON.parse(data);
            resolve(convertRate(rate));
          });
        }
      );

      req.on('error', e => {
        reject(e);
      });
    });
  }

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
      );
    }

    const source = pair.substr(0, 3);
    const target = pair.substr(3, 3);

    if (!baseRate[source]) throw new Error(`Unknown currency code "${source}"`);
    if (!baseRate[target]) throw new Error(`Unknown currency code "${target}"`);

    return {
      id: pair,
      rate: Number(
        source === BASE
          ? baseRate[target]
          : (1 / baseRate[source]) * baseRate[target]
      ).toFixed(6)
    };
  }

  /**
   * Convert response from API service to internal rate object.
   *
   * @param {object} dict { ..., quotes: { USDUSD: 1, USDEUR: 0.834499, ... } }
   * @return {object} dict { USD: 1, EUR: 0.834499, ... }
   */
  function convertRate(rate) {
    return Object.keys(rate.quotes).reduce(
      (acc, pair) => {
        const code = pair.substr(3, 3);
        acc[code] = rate.quotes[pair];
        return acc;
      },
      { [BASE]: 1 }
    );
  }
};
