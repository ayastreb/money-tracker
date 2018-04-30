import Account from './Account'

it('has default group', () => {
  expect(Account.defaultGroup).toEqual('cash')
})

it('returns list of group options', () => {
  const options = Account.groupOptions()

  expect(Array.isArray(options)).toBeTruthy()
  expect(options.length).toBeGreaterThanOrEqual(1)
  expect(options[0]).toHaveProperty('key')
  expect(options[0]).toHaveProperty('value')
  expect(options[0]).toHaveProperty('text')
})

it('returns group name for given code', () => {
  expect(Account.groupName('cash')).toEqual('Cash')
  expect(Account.groupName('bank')).toEqual('Bank Account')
})

it('defaults id to current timestamp if not present in form', () => {
  const form = {
    name: 'Test',
    group: 'cash',
    balance: {
      USD: '100.95'
    }
  }
  Date.now = jest.fn(() => '1234')
  expect(Account.fromForm(form)).toEqual({
    id: 'A1234',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095
    }
  })
})

it('converts balance to subunits from form data', () => {
  const form = {
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: '100.95',
      JPY: ''
    }
  }
  expect(Account.fromForm(form)).toEqual({
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 0
    }
  })
})

it('keeps only stored keys from form data', () => {
  const form = {
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: '100.95',
      JPY: '2200'
    },
    currencies: ['USD'],
    on_dashboard: true,
    completed: true,
    foo: 'bar'
  }
  expect(Account.fromForm(form)).toEqual({
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    },
    currencies: ['USD'],
    on_dashboard: true
  })
})

it('converts balance from subunits back to float', () => {
  const data = {
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    }
  }
  expect(Account.toForm(data)).toEqual({
    name: 'Test',
    group: 'cash',
    balance: {
      USD: '100.95',
      JPY: '2200'
    }
  })
})

it('converts storage id, filters out unrelated fields when read from storage', () => {
  const doc = {
    _id: 'A12345',
    _rev: '1-abcd',
    _conflicts: [],
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    }
  }
  expect(Account.fromStorage(doc)).toEqual({
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    }
  })
})

it('skips id from data when write to storage', () => {
  const data = {
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    }
  }
  expect(Account.toStorage(data)).toEqual({
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    }
  })
})

it('returns new record when mutating balance', () => {
  const original = {
    name: 'Test',
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10095,
      JPY: 2200
    }
  }
  const mutated1 = Account.mutateBalance(original, 'USD', 100)
  const mutated2 = Account.mutateBalance(original, 'JPY', -200)
  expect(original === mutated1).toBeFalsy()
  expect(original).toEqual({
    name: 'Test',
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10095,
      JPY: 2200
    }
  })
  expect(mutated1).toEqual({
    name: 'Test',
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10195,
      JPY: 2200
    }
  })
  expect(mutated2).toEqual({
    name: 'Test',
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10095,
      JPY: 2000
    }
  })
})
