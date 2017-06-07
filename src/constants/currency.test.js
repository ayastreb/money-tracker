import { currencyAsDropdownOptions } from './currency'

it('should return list of currencies in dropdown options format', () => {
  const options = currencyAsDropdownOptions()

  expect(Array.isArray(options)).toBeTruthy()
  expect(options.length).toBeGreaterThanOrEqual(1)
  expect(options[0]).toHaveProperty('key')
  expect(options[0]).toHaveProperty('value')
  expect(options[0]).toHaveProperty('text')
})
