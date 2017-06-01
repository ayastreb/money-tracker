import reducer from './accounts'
import { CREATE_ACCOUNT } from '../constants/'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual([])
})

it('should handle create account action', () => {
  expect(
    reducer(undefined, {
      type: CREATE_ACCOUNT,
      account: { id: 1, name: 'wallet', type: 'cash', balance: { USD: 999 } }
    })
  ).toEqual([
    {
      id: 1,
      name: 'wallet',
      type: 'cash',
      balance: { USD: 999 }
    }
  ])

  expect(
    reducer(
      [
        {
          id: 1,
          name: 'wallet',
          type: 'cash',
          balance: { USD: 999 }
        }
      ],
      {
        type: CREATE_ACCOUNT,
        account: {
          id: 2,
          name: 'bank of america',
          type: 'bank',
          balance: { USD: 9999 }
        }
      }
    )
  ).toEqual([
    {
      id: 1,
      name: 'wallet',
      type: 'cash',
      balance: { USD: 999 }
    },
    {
      id: 2,
      name: 'bank of america',
      type: 'bank',
      balance: { USD: 9999 }
    }
  ])
})
