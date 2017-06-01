import React from 'react'
import renderer from 'react-test-renderer'
import CurrencyTable from './CurrencyTable'
global.navigator = {
  userAgent: 'node.js'
}

it('should render currency table with given currencies', () => {
  const tree = renderer
    .create(
      <CurrencyTable
        currencies={['USD', 'JPY']}
        balance={{ USD: 10, JPY: 200 }}
        onChecked={() => {}}
        update={() => {}}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
