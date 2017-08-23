import { createActions } from 'redux-actions'
import accounts from '../util/storage/accounts'

export const {
  loadAccounts,
  syncAccounts,
  saveAccount,
  removeAccount,
  changeBalance
} = createActions({
  LOAD_ACCOUNTS: accounts.loadAll,
  SYNC_ACCOUNTS: accounts.sync,
  SAVE_ACCOUNT: [account => accounts.save(account), account => ({ account })],
  REMOVE_ACCOUNT: [id => accounts.remove(id), id => ({ id })],
  CHANGE_BALANCE: [
    (id, currency, amount) => accounts.changeBalance(id, currency, amount),
    (id, currency, amount) => ({ id, currency, amount })
  ]
})
