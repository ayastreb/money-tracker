import getAccountsMutations from './AccountMutations'
import { EXPENSE, TRANSFER, INCOME } from '../Transaction'

describe('create new transaction', () => {
  it('decreases amount for new expense', () => {
    const prev = undefined
    const next = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      }
    ])
  })

  it('increases amount for new income', () => {
    const prev = undefined
    const next = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 101,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 101,
        currency: 'USD'
      }
    ])
  })

  it('decreases amount for new transfer source, increases for target', () => {
    const prev = undefined
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 1070,
        currency: 'JPY'
      }
    ])
  })

  it('does not mutate when new transfer source and target are the same', () => {
    const prev = undefined
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12345',
      linkedAmount: 100,
      linkedCurrency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([])
  })
})

describe('update existing transaction', () => {
  it('changed amount, same account, same currency, expense', () => {
    const prev = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    const nextHigher = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -150,
      currency: 'USD'
    }
    const nextLower = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -75,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, nextHigher)).toEqual([
      {
        accountId: 'A12345',
        amount: -50,
        currency: 'USD'
      }
    ])
    expect(getAccountsMutations(prev, nextLower)).toEqual([
      {
        accountId: 'A12345',
        amount: 25,
        currency: 'USD'
      }
    ])
  })

  it('changed amount, same account, same currency, income', () => {
    const prev = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD'
    }
    const nextHigher = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 150,
      currency: 'USD'
    }
    const nextLower = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 75,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, nextHigher)).toEqual([
      {
        accountId: 'A12345',
        amount: 50,
        currency: 'USD'
      }
    ])
    expect(getAccountsMutations(prev, nextLower)).toEqual([
      {
        accountId: 'A12345',
        amount: -25,
        currency: 'USD'
      }
    ])
  })

  it('changed amount, same account, same currency, transfer', () => {
    const prev = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const nextHigherSource = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 150,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const nextLowerSource = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 75,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const nextHigherTarget = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1170,
      linkedCurrency: 'JPY'
    }
    const nextLowerTarget = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1050,
      linkedCurrency: 'JPY'
    }
    const nextBothDiff = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 120,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1040,
      linkedCurrency: 'JPY'
    }
    expect(getAccountsMutations(prev, nextHigherSource)).toEqual([
      {
        accountId: 'A12345',
        amount: -50,
        currency: 'USD'
      }
    ])
    expect(getAccountsMutations(prev, nextLowerSource)).toEqual([
      {
        accountId: 'A12345',
        amount: 25,
        currency: 'USD'
      }
    ])
    expect(getAccountsMutations(prev, nextHigherTarget)).toEqual([
      {
        accountId: 'A12346',
        amount: 100,
        currency: 'JPY'
      }
    ])
    expect(getAccountsMutations(prev, nextLowerTarget)).toEqual([
      {
        accountId: 'A12346',
        amount: -20,
        currency: 'JPY'
      }
    ])
    expect(getAccountsMutations(prev, nextBothDiff)).toEqual([
      {
        accountId: 'A12345',
        amount: -20,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -30,
        currency: 'JPY'
      }
    ])
  })

  it('changed amount, changed account, changed currency, expense', () => {
    const prev = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    const next = {
      kind: EXPENSE,
      accountId: 'A12346',
      amount: -200,
      currency: 'JPY'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -200,
        currency: 'JPY'
      }
    ])
  })

  it('changed amount, changed account, changed currency, income', () => {
    const prev = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD'
    }
    const next = {
      kind: INCOME,
      accountId: 'A12346',
      amount: 2200,
      currency: 'JPY'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 2200,
        currency: 'JPY'
      }
    ])
  })

  it('changed amount, changed account, changed currency, transfer', () => {
    const prev = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const next = {
      kind: TRANSFER,
      accountId: 'A12346',
      amount: 90,
      currency: 'EUR',
      linkedAccountId: 'A12347',
      linkedAmount: 125,
      linkedCurrency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1070,
        currency: 'JPY'
      },
      {
        accountId: 'A12346',
        amount: -90,
        currency: 'EUR'
      },
      {
        accountId: 'A12347',
        amount: 125,
        currency: 'USD'
      }
    ])
  })

  it('changed amount, changed one account, changed currency, transfer', () => {
    const prev = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 75,
      linkedCurrency: 'EUR'
    }

    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1070,
        currency: 'JPY'
      },
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 75,
        currency: 'EUR'
      }
    ])
  })

  it('same amount, changed one account, changed currency, transfer', () => {
    const prev = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'UAH'
    }

    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1070,
        currency: 'JPY'
      },
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 1070,
        currency: 'UAH'
      }
    ])
  })

  it('changed kind, income -> expense', () => {
    const prev = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD'
    }
    const next = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      },
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      }
    ])
  })

  it('changed kind, expense -> income', () => {
    const prev = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    const next = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      }
    ])
  })

  it('changed kind, expense -> transfer', () => {
    const prev = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 105,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1080,
      linkedCurrency: 'JPY'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12345',
        amount: -105,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 1080,
        currency: 'JPY'
      }
    ])
  })

  it('changed kind, transfer -> income', () => {
    const prev = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 105,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1080,
      linkedCurrency: 'JPY'
    }
    const next = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 100,
      currency: 'EUR'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 105,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1080,
        currency: 'JPY'
      },
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'EUR'
      }
    ])
  })
})
