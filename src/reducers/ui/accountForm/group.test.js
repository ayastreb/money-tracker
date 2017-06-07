import reducer from './group'
import { DEFAULT_GROUP } from '../../../constants/account'
import { CHANGE_GROUP } from '../../../actions/ui/accountForm'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE
} from '../../../actions/accounts'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(DEFAULT_GROUP)
})

it('resets to initial state when account is created', () => {
  expect(reducer('bank', { type: CREATE_ACCOUNT })).toEqual(DEFAULT_GROUP)
})

it('restores form value when failed to persist account', () => {
  expect(reducer({}, { type: CREATE_ACCOUNT_FAILURE, group: 'bank' })).toEqual(
    'bank'
  )
})

it('changes account form group', () => {
  expect(reducer('cash', { type: CHANGE_GROUP, group: 'bank' })).toEqual('bank')
})
