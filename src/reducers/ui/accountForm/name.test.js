import reducer from './name'
import { CHANGE_NAME } from '../../../actions/ui/accountForm'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE
} from '../../../actions/accounts'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual('')
})

it('resets to initial state when account is created', () => {
  expect(reducer('foo', { type: CREATE_ACCOUNT })).toEqual('')
})

it('restores form value when failed to persist account', () => {
  expect(reducer({}, { type: CREATE_ACCOUNT_FAILURE, name: 'foo' })).toEqual(
    'foo'
  )
})

it('changes account form name', () => {
  expect(reducer('foo', { type: CHANGE_NAME, name: 'bar' })).toEqual('bar')
})
