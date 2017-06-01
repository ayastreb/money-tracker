import React from 'react'
import renderer from 'react-test-renderer'
import CurrencyForm from './CurrencyForm'

global.navigator = {
  userAgent: 'node.js'
}

it('should render currency form', () => {
  const tree = renderer
    .create(<CurrencyForm base="USD" secondary={['EUR', 'JPY']} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
