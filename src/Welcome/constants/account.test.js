import { accountTypesAsDropdownOptions } from './account'

it('should return list of account types in dropdown options format', () => {
  const options = accountTypesAsDropdownOptions()

  expect(Array.isArray(options)).toBeTruthy()
  expect(options.length).toBeGreaterThanOrEqual(1)
  expect(options[0]).toHaveProperty('key')
  expect(options[0]).toHaveProperty('value')
  expect(options[0]).toHaveProperty('text')
})
