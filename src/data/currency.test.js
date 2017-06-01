import {
  currenciesAsDropdownOptions,
  currencyName,
  currencySymbol,
  currencyExponent
} from './currency'

it('should return list of currencies in dropdown options format', () => {
  const options = currenciesAsDropdownOptions()

  expect(Array.isArray(options)).toBeTruthy()
  expect(options.length).toBeGreaterThanOrEqual(1)
  expect(options[0]).toHaveProperty('key')
  expect(options[0]).toHaveProperty('value')
  expect(options[0]).toHaveProperty('text')
})

it('should return currency name for given code', () => {
  expect(currencyName('USD')).toEqual('US Dollar')
})

it('should return currency symbol for given code', () => {
  expect(currencySymbol('USD')).toEqual('$')
})

it('should fallback to code if currency does not have symbol', () => {
  expect(currencySymbol('AMD')).toEqual('AMD')
})

it('should return currency minimal unit (exponent) for given code', () => {
  expect(currencyExponent('EUR')).toEqual(2)
  expect(currencyExponent('JPY')).toEqual(0)
  expect(currencyExponent('BHD')).toEqual(3)
})

it('should return undefined for unknown currency code', () => {
  expect(currencyName('XXX')).toBeUndefined()
  expect(currencySymbol('XXX')).toBeUndefined()
  expect(currencyExponent('XXX')).toBeUndefined()
})
