import { handleActions } from 'redux-actions'
import {
  changeTransactionKind,
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
    [changeTransactionKind]: (state, { payload }) => ({
      ...state,
      kind: payload
    }),
    [changeAccount]: (state, { payload }) => ({
      ...state,
      accountId: payload
    }),
    [changeAmount]: (state, { payload }) => ({
      ...state,
      amount: payload,
      linkedAmount:
        state.currency === state.linkedCurrency ? payload : state.linkedAmount
    }),
    [changeCurrency]: (state, { payload }) => ({
      ...state,
      currency: payload,
      linkedAmount:
        state.linkedCurrency === payload ? state.amount : state.linkedAmount
    }),
    [changeLinkedAccount]: (state, { payload }) => ({
      ...state,
      linkedAccountId: payload
    }),
    [changeLinkedAmount]: (state, { payload }) => ({
      ...state,
      amount: state.currency === state.linkedCurrency ? payload : state.amount,
      linkedAmount: payload
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
    [changeDate]: (state, { payload }) => ({
      ...state,
      date: payload
    }),
    [changeNote]: (state, { payload }) => ({
      ...state,
      note: payload
    }),
    [saveTransaction]: () => initialState()
  },
  initialState()
)
