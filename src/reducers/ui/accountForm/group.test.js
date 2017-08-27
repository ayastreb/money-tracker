import reducer from './group'
import Account from '../../../models/Account'
import { changeGroup } from '../../../actions/ui/accountForm'
import {
  saveAccountRequest,
  saveAccountFailure
} from '../../../actions/accounts'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(Account.defaultGroup)
})

it('changes account form group', () => {
  expect(reducer('cash', changeGroup('bank'))).toEqual('bank')
})

it('resets to initial state when account is created', () => {
  expect(reducer('bank', saveAccountRequest())).toEqual(Account.defaultGroup)
})

it('restores form value when failed to persist account', () => {
  expect(
    reducer({}, saveAccountFailure(new Account({ group: 'bank' })))
  ).toEqual('bank')
})
