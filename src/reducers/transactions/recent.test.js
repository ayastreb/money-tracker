import reducer from './recent'
import {
  UPDATE_RECENT_TRANSACTIONS,
  SAVE_TRANSACTION
} from '../../actions/transactions'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({ byId: {}, allIds: [] })
})

it('loads transactions', () => {
  expect(
    reducer(undefined, {
      type: UPDATE_RECENT_TRANSACTIONS,
      transactions: [
        { id: 'T12345', amount: 100 },
        { id: 'T12346', amount: 200 }
      ]
    })
  ).toEqual({
    byId: {
      T12345: { id: 'T12345', amount: 100 },
      T12346: { id: 'T12346', amount: 200 }
    },
    allIds: ['T12345', 'T12346']
  })
})

it('adds new transaction to the beginning of the list', () => {
  expect(
    reducer(
      {
        byId: {
          T12345: { id: 'T12345', amount: 100 },
          T12346: { id: 'T12346', amount: 200 }
        },
        allIds: ['T12345', 'T12346']
      },
      {
        type: SAVE_TRANSACTION,
        transaction: {
          id: 'T12347',
          amount: 300
        }
      }
    )
  ).toEqual({
    byId: {
      T12345: { id: 'T12345', amount: 100 },
      T12346: { id: 'T12346', amount: 200 },
      T12347: { id: 'T12347', amount: 300 }
    },
    allIds: ['T12347', 'T12345', 'T12346']
  })
})
