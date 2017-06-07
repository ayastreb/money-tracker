export async function fetchExchangeRates(base, target) {
  // TODO: implement fetching exchange rates from HTTP API
  return new Promise(resolve => resolve({ [base]: 1.0 }))
}
