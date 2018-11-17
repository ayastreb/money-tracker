import { getRecentTransactions } from './transactions';
import EntityMap from '../../entities/EntityMap';

it('returns recent transactions', () => {
  const state = {
    entities: {
      accounts: EntityMap.fromArray([
        { id: 'A12345', name: 'foo acc', balance: { USD: 1 } },
        { id: 'A12346', name: 'bar acc', balance: { EUR: 2 } }
      ]),
      transactions: {
        recent: EntityMap.fromArray([
          { id: 'T12345', accountId: 'A12345', amount: 10 },
          { id: 'T12346', accountId: 'A12345', amount: 20 },
          {
            id: 'T12347',
            accountId: 'A12346',
            amount: 10,
            linkedAccountId: 'A12345',
            linkedAmount: 10
          }
        ])
      }
    }
  };

  const expectedTransactions = [
    { id: 'T12345', accountId: 'A12345', amount: 10, accountName: 'foo acc' },
    { id: 'T12346', accountId: 'A12345', amount: 20, accountName: 'foo acc' },
    {
      id: 'T12347',
      accountId: 'A12346',
      amount: 10,
      linkedAccountId: 'A12345',
      linkedAmount: 10,
      accountName: 'bar acc',
      linkedAccountName: 'foo acc'
    }
  ];

  expect(getRecentTransactions(state)).toEqual(expectedTransactions);
});
