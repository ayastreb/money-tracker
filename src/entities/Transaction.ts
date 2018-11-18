import format from 'date-fns/format';
import Currency from 'entities/Currency';
import { toLocalTimestamp } from 'util/timezone';

interface TransactionBaseT {
  kind: TransationKindT;
  accountId: string;
  currency: string;
  note?: string;
  linkedAccountId?: string;
  linkedCurrency?: string;
}

export interface TransactionFormT extends TransactionBaseT {
  id?: string;
  amount: string;
  date: string;
  linkedAmount?: string;
  tags: { [kind in TransationKindT]?: string[] };
}

export interface TransactionStateT extends TransactionBaseT {
  id: string;
  amount: number;
  date: number;
  linkedAmount?: number;
  tags?: string[];
}

export interface TransactionStorageT extends TransactionBaseT {
  _id?: string;
  amount: number;
  linkedAmount?: number;
  tags?: string[];
}

export enum TransationKindT {
  Expense,
  Transfer,
  Income
}

const { Expense, Transfer, Income } = TransationKindT;
const TransactionKindToText: { [kind in TransationKindT]: string } = {
  [Expense]: 'Expense',
  [Transfer]: 'Transfer',
  [Income]: 'Income'
};

export const defaultKind = Expense;
export const recentListLimit = 5;
export const rowsPerSearchPage = 10;
export const pagerSizeMobile = 5;
export const pagerSizeDesktop = 9;

export const kindLabel = (kind: TransationKindT) => TransactionKindToText[kind];

export const formToState = (data: TransactionFormT): TransactionStateT => {
  const tags = data.tags && data.tags[data.kind];
  return {
    ...data,
    id: data.id || '',
    amount: Currency.toCents(
      parseFloat(data.amount) * (data.kind === Expense ? -1 : 1),
      data.currency
    ),
    linkedAmount:
      data.kind === Transfer && data.linkedCurrency && data.linkedAmount
        ? Currency.toCents(data.linkedAmount, data.linkedCurrency)
        : undefined,
    note: data.note || undefined,
    tags: tags && tags.length > 0 ? tags : undefined,
    date: new Date(data.date).getTime()
  };
};

export const stateToForm = (data: TransactionStateT): TransactionFormT => {
  return {
    ...data,
    amount: Currency.centsToString(
      data.amount * (data.kind === Expense ? -1 : 1),
      data.currency,
      false
    ),
    linkedAmount:
      data.kind === Transfer && data.linkedAmount && data.linkedCurrency
        ? Currency.centsToString(data.linkedAmount, data.linkedCurrency, false)
        : undefined,
    note: data.note || '',
    tags: {
      [Expense]: [],
      [Income]: [],
      [data.kind]: data.tags || []
    },
    date: format(toLocalTimestamp(data.date), 'YYYY-MM-DD')
  };
};

export const storageToState = ({
  _id,
  kind,
  note,
  tags,
  accountId,
  amount,
  currency,
  linkedAccountId,
  linkedAmount,
  linkedCurrency
}: TransactionStorageT): TransactionStateT => {
  if (!_id) throw new Error('Transaction storage object missing "_id"');
  const match = _id.match(/T([0-9]+)-/);
  if (!match) throw new Error('No date in Transaction ID!');

  return {
    id: _id,
    kind,
    note,
    tags,
    accountId,
    amount,
    currency,
    date: parseInt(match[1], 10),
    linkedAccountId,
    linkedAmount,
    linkedCurrency
  };
};

export const stateToStorage = ({
  kind,
  note,
  tags,
  accountId,
  amount,
  currency,
  linkedAccountId,
  linkedAmount,
  linkedCurrency
}: TransactionStateT): TransactionStorageT => {
  return {
    kind,
    note,
    tags,
    accountId,
    amount,
    currency,
    ...(kind === Transfer && {
      linkedAccountId,
      linkedAmount,
      linkedCurrency
    })
  };
};
