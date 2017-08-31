import reducer from './name'
import { changeName } from '../../../actions/ui/accountForm'
import { saveAccount, saveAccountFailure } from '../../../actions/accounts'
import Account from '../../../models/Account'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual('')
})

it('resets to initial state when account is created', () => {
  expect(reducer('foo', saveAccount())).toEqual('')
})

it('restores form value when failed to persist account', () => {
  expect(reducer({}, saveAccountFailure(new Account({ name: 'foo' })))).toEqual(
    'foo'
  )
})

it('changes account form name', () => {
  expect(reducer('foo', changeName('bar'))).toEqual('bar')
})
