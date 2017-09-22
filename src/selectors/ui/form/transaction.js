import format from 'date-fns/format'
import { createSelector } from 'reselect'
import { getAccountsList } from '../../entities/accounts'
import { getBaseCurrency } from '../../settings'
import Transaction, { EXPENSE, INCOME } from '../../../entities/Transaction'

export const getForm = state => state.ui.form.transaction

export const getDefaultState = createSelector(
  getAccountsList,
  getBaseCurrency,
  (accounts, base) => {
    const accountId = accounts[0].id
    const currency = accounts[0].currencies.includes(base)
      ? base
      : accounts[0].currencies[0]
    let linkedAccountId = null
    let linkedCurrency = null
    if (accounts.length > 1 || accounts[0].currencies.length > 1) {
      if (accounts.length > 1) {
        linkedAccountId = accounts[1].id
        linkedCurrency = accounts[1].currencies[0]
      } else {
        linkedAccountId = accounts[0].id
        linkedCurrency = accounts[0].currencies[1]
      }
    }

    return {
      kind: Transaction.defaultKind,
      isModalOpen: false,
      accountId,
      currency,
      amount: '',
      linkedAccountId,
      linkedCurrency,
      linkedAmount: '',
      tags: {
        [EXPENSE]: [],
        [INCOME]: []
      },
      date: format(new Date(), 'YYYY-MM-DD'),
      note: ''
    }
  }
)
