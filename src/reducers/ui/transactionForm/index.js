import { handleActions } from 'redux-actions'
import { loadAccountsSuccess } from '../../../actions/accounts'
import {
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeExpenseTags,
  changeIncomeTags,
  changeDate,
  changeNote
} from '../../../actions/ui/transactionForm'
import { saveTransaction } from '../../../actions/transactions'
import Transaction, { EXPENSE, INCOME } from '../../../entities/Transaction'
import format from 'date-fns/format'

const initialState = () => ({
  kind: Transaction.defaultKind,
  accountId: null,
  amount: '',
  currency: null,
  linkedAccountId: null,
  linkedAmount: '',
  linkedCurrency: null,
  tags: {
    [EXPENSE]: [],
    [INCOME]: []
  },
  date: format(new Date(), 'YYYY-MM-DD'),
  note: ''
})

export default handleActions(
  {
    [loadAccountsSuccess]: (state, { payload }) => {
      if (state.accountId !== null || payload.length === 0) return state
      const account = payload[0]
      const currencies = Object.keys(account.balance)
      if (payload.length === 1 && currencies.length === 1) {
        return {
          ...state,
          accountId: payload[0].id,
          currency: currencies[0]
        }
      }

      return {
        ...state,
        accountId: payload[0].id,
        currency: currencies[0],
        linkedAccountId: currencies.length > 1 ? payload[0].id : payload[1].id,
        linkedCurrency:
          currencies.length > 1
            ? currencies[1]
            : Object.keys(payload[1].balance)[0]
      }
    },
    [changeKind]: (state, { payload }) => ({ ...state, kind: payload }),
    [changeAccount]: (state, { payload }) => ({
      ...state,
      accountId: payload.accountId,
      currency: payload.currency.includes(state.currency)
        ? state.currency
        : payload.currency[0]
    }),
    [changeLinkedAccount]: (state, { payload }) => ({
      ...state,
      linkedAccountId: payload.accountId,
      linkedCurrency: payload.currency.includes(state.linkedCurrency)
        ? state.linkedCurrency
        : payload.currency[0]
    }),
    [changeAmount]: (state, { payload }) => ({
      ...state,
      amount: payload,
      linkedAmount:
        state.currency === state.linkedCurrency ? payload : state.linkedAmount
    }),
    [changeLinkedAmount]: (state, { payload }) => ({
      ...state,
      amount: state.currency === state.linkedCurrency ? payload : state.amount,
      linkedAmount: payload
    }),
    [changeCurrency]: (state, { payload }) => ({
      ...state,
      currency: payload,
      linkedAmount:
        state.linkedCurrency === payload ? state.amount : state.linkedAmount
    }),
    [changeLinkedCurrency]: (state, { payload }) => ({
      ...state,
      linkedCurrency: payload,
      linkedAmount:
        state.currency === payload ? state.amount : state.linkedAmount
    }),
    [changeExpenseTags]: (state, { payload }) => ({
      ...state,
      tags: { ...state.tags, [EXPENSE]: payload }
    }),
    [changeIncomeTags]: (state, { payload }) => ({
      ...state,
      tags: { ...state.tags, [INCOME]: payload }
    }),
    [changeDate]: (state, { payload }) => ({ ...state, date: payload }),
    [changeNote]: (state, { payload }) => ({ ...state, note: payload }),
    [saveTransaction]: () => initialState()
  },
  initialState()
)
