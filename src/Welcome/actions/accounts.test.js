import {
  createAccount,
  removeAccount,
  CREATE_ACCOUNT,
  REMOVE_ACCOUNT
} from './accounts'

it('should set date as ID and convert balances to minimal unit', () => {
  Date.now = jest.fn(() => 12345)

  const actual = createAccount({
    accountName: 'wallet',
    accountType: 'cash',
    balance: {
      USD: '9.99',
      JPY: '2210'
    }
  })
  const expected = {
    type: CREATE_ACCOUNT,
    account: {
      id: 12345,
      name: 'wallet',
      type: 'cash',
      balance: {
        USD: 999, // $9.99 becomes 999 cents
        JPY: 2210 // Yen does not have cents, so it stays 2210
      }
    }
  }

  expect(actual).toEqual(expected)
})

it('should handle undefined in balance', () => {
  Date.now = jest.fn(() => 12345)

  const actual = createAccount({
    accountName: 'wallet',
    accountType: 'cash',
    balance: {
      USD: '9.99',
      JPY: undefined,
      EUR: ''
    }
  })
  const expected = {
    type: CREATE_ACCOUNT,
    account: {
      id: 12345,
      name: 'wallet',
      type: 'cash',
      balance: {
        USD: 999,
        EUR: 0
      }
    }
  }

  expect(actual).toEqual(expected)
})

it('should generate remove account action', () => {
  const actual = removeAccount(12345)
  const expected = {
    type: REMOVE_ACCOUNT,
    id: 12345
  }

  expect(actual).toEqual(expected)
})
