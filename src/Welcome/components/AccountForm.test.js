import React from 'react'
import renderer from 'react-test-renderer'
import AccountForm from './AccountForm'
global.navigator = {
  userAgent: 'node.js'
}

it('should render account form', () => {
  const tree = renderer
    .create(
      <AccountForm currencies={['USD', 'JPY']} createAccount={() => {}} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
