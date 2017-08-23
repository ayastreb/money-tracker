import reducer from './group'
import Account from '../../../models/Account'
import { CHANGE_GROUP } from '../../../actions/ui/accountForm'
import { saveAccount } from '../../../actions/accounts'
import { FAILURE, REQUEST } from '../../../middleware/promise'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(Account.defaultGroup)
})

it('changes account form group', () => {
  expect(reducer('cash', { type: CHANGE_GROUP, group: 'bank' })).toEqual('bank')
})

it('resets to initial state when account is created', () => {
  expect(reducer('bank', { type: `${saveAccount}_${REQUEST}` })).toEqual(
    Account.defaultGroup
  )
})

it('restores form value when failed to persist account', () => {
  expect(
    reducer(
      {},
      {
        type: `${saveAccount}_${FAILURE}`,
        meta: { account: { group: 'bank' } }
      }
    )
  ).toEqual('bank')
})
