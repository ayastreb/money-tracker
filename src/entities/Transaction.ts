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

export function getKindLabel(kind: TransationKindT) {
  return TransactionKindToText[kind];
}

export function formToState(form: TransactionFormT): TransactionStateT {
  const tags = form.tags && form.tags[form.kind];

  return {
    ...form,
    id: form.id || '',
    amount: Currency.numberToCents(
      parseFloat(form.amount) * (form.kind === Expense ? -1 : 1),
      form.currency
    ),
    linkedAmount:
      form.kind === Transfer && form.linkedCurrency && form.linkedAmount
        ? Currency.numberToCents(form.linkedAmount, form.linkedCurrency)
        : undefined,
    note: form.note || undefined,
    tags: tags && tags.length > 0 ? tags : undefined,
    date: new Date(form.date).getTime()
  };
}

export function stateToForm(state: TransactionStateT): TransactionFormT {
  return {
    ...state,
    amount: Currency.centsToString(
      state.amount * (state.kind === Expense ? -1 : 1),
      state.currency,
      false
    ),
    linkedAmount:
      state.kind === Transfer && state.linkedAmount && state.linkedCurrency
        ? Currency.centsToString(
            state.linkedAmount,
            state.linkedCurrency,
            false
          )
        : undefined,
    note: state.note || '',
    tags: {
      [Expense]: [],
      [Income]: [],
      [state.kind]: state.tags || []
    },
    date: format(toLocalTimestamp(state.date), 'YYYY-MM-DD')
  };
}

export function storageToState({
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
}: TransactionStorageT): TransactionStateT {
  if (!_id) throw new Error('Transaction storage object missing "_id"');
  // date timestamp is encoded in transaction ID
  const dateRegexMatch = _id.match(/T([0-9]+)-/);
  if (!dateRegexMatch) throw new Error(`No date in Transaction ID "${_id}"`);

  return {
    id: _id,
    date: parseInt(dateRegexMatch[1], 10),
    kind,
    note,
    tags,
    accountId,
    amount,
    currency,
    linkedAccountId,
    linkedAmount,
    linkedCurrency
  };
}

export function stateToStorage({
  kind,
  note,
  tags,
  accountId,
  amount,
  currency,
  linkedAccountId,
  linkedAmount,
  linkedCurrency
}: TransactionStateT): TransactionStorageT {
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
}
