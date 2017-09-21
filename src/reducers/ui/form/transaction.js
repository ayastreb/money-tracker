import { handleActions } from 'redux-actions'
import {
  fillInTransactionForm,
  openTransactionInModal,
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeTags,
  changeDate,
  changeNote
} from '../../../actions/ui/form/transaction'
import Transaction from '../../../entities/Transaction'

const initialState = {
  kind: Transaction.defaultKind,
  isModalOpen: false
}

export default handleActions(
  {
    [fillInTransactionForm]: (state, { payload }) => payload,
    [openTransactionInModal]: (state, { payload }) => ({
      ...state,
      ...payload,
      isModalOpen: true
    }),
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
    [changeTags]: (state, { payload }) => ({
      ...state,
      tags: { ...state.tags, [state.kind]: payload }
    }),
    [changeDate]: (state, { payload }) => ({ ...state, date: payload }),
    [changeNote]: (state, { payload }) => ({ ...state, note: payload })
  },
  initialState
)
