import CsvReader from './CsvReader';
import { TransationKindT } from '../entities/Transaction';

const { Expense, Transfer, Income } = TransationKindT;

it('throws error when file format is wrong', () => {
  const file = new File(['test;wrong;header'], { type: 'text/csv' });

  return CsvReader(file).catch(error =>
    expect(error.message).toEqual(`Invalid file format!
    Must be a CSV with following columns:
    date;account;tags;amount;currency;description;transfer`)
  );
});

it('skips rows with missing columns', () => {
  const file = new File(
    [
      'date;account;category;total;currency;description;transfer\r\n',
      '19.09.2017;foo;income tag;6000,75\r\n'
    ],
    { type: 'text/csv' }
  );

  return expect(CsvReader(file)).resolves.toEqual({
    transactions: [],
    accounts: new Map(),
    currencies: new Set()
  });
});

it('parses CSV file content', () => {
  const file = new File(
    [
      'date;account;category;total;currency;description;transfer\r\n',
      '19.09.2017;foo;income tag;6000,75;UAH;;\r\n',
      '19.09.2017;bar;income tag\\subtag;6000,00;USD;;\n',
      '19.09.2017;bar;;-101,08;USD;transfer note;baz\n',
      '19.09.2017;baz;;75,95;EUR;;bar\n',
      '01.10.2017;bar;expense tag/subtag;-1800,00;JPY;;\n'
    ],
    { type: 'text/csv' }
  );

  return expect(CsvReader(file)).resolves.toEqual({
    transactions: [
      {
        kind: Income,
        account: 'foo',
        amount: 6000.75,
        currency: 'UAH',
        date: '2017-09-19',
        tags: { [Income]: ['income tag'] },
        note: ''
      },
      {
        kind: Income,
        account: 'bar',
        amount: 6000.0,
        currency: 'USD',
        date: '2017-09-19',
        tags: { [Income]: ['income tag', 'subtag'] },
        note: ''
      },
      {
        kind: Transfer,
        account: 'bar',
        amount: 101.08,
        currency: 'USD',
        linkedAccount: 'baz',
        linkedAmount: 75.95,
        linkedCurrency: 'EUR',
        date: '2017-09-19',
        tags: '',
        note: 'transfer note'
      },
      {
        kind: Expense,
        account: 'bar',
        amount: 1800.0,
        currency: 'JPY',
        date: '2017-10-01',
        tags: { [Expense]: ['expense tag', 'subtag'] },
        note: ''
      }
    ],
    accounts: new Map([
      ['foo', new Set(['UAH'])],
      ['bar', new Set(['USD', 'JPY'])],
      ['baz', new Set(['EUR'])]
    ]),
    currencies: new Set(['UAH', 'USD', 'EUR', 'JPY'])
  });
});
