import React from 'react'
import renderer from 'react-test-renderer'
import CurrencyInput from './CurrencyInput'
global.navigator = {
  userAgent: 'node.js'
}

it('should render currency input', () => {
  const tree = renderer
    .create(
      <CurrencyInput
        value={100}
        code="USD"
        update={() => {}}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
