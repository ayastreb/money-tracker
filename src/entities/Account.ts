import Currency from './Currency';

type AccountStateBalanceT = {
  [currency: string]: number;
};

type AccountFormBalanceT = {
  [currency: string]: string;
};

interface AccountBaseT {
  name: string;
  group: AccountGroupT;
  currencies: string[];
  on_dashboard: boolean;
  archived?: boolean;
}

export interface AccountStateT extends AccountBaseT {
  id: string;
  balance: AccountStateBalanceT;
}

export interface AccountStorageT extends AccountBaseT {
  _id: string;
  _rev?: string;
  _conflicts?: string[];
  balance: AccountStateBalanceT;
}

export interface AccountFormT extends AccountBaseT {
  id?: string;
  balance: AccountFormBalanceT;
  completed?: boolean;
  isModalOpen?: boolean;
  isDeleteRequest?: boolean;
  isDeleteRunning?: boolean;
  itemsToProcess?: number;
  itemsProcessed?: number;
}

export enum AccountGroupT {
  Cash = 'cash',
  Bank = 'bank',
  Deposit = 'deposit',
  Credit = 'credit',
  Asset = 'asset'
}
type GroupCodeToTextTupleT = [AccountGroupT, string];
type GroupCodeToTextMapT = { [code in AccountGroupT]?: string };
const GroupCodeToTextTupleList: GroupCodeToTextTupleT[] = [
  [AccountGroupT.Cash, 'Cash'],
  [AccountGroupT.Bank, 'Bank Account'],
  [AccountGroupT.Deposit, 'Deposit'],
  [AccountGroupT.Credit, 'Credit'],
  [AccountGroupT.Asset, 'Asset']
];
const GroupCodeToTextMap: GroupCodeToTextMapT = GroupCodeToTextTupleList.reduce(
  (acc: GroupCodeToTextMapT, [code, text]) => {
    acc[code] = text;
    return acc;
  },
  {}
);

export const defaultGroup = AccountGroupT.Cash;
export const groupName = (code: AccountGroupT) => GroupCodeToTextMap[code];
export const groupOptions = () => {
  return GroupCodeToTextTupleList.map(([code, text]) => ({
    key: code,
    value: code,
    text
  }));
};

export enum DeleteStrategyT {
  Archive,
  Cleanup,
  Move
}
export const defaultDeleteStrategy = DeleteStrategyT.Archive;
export const deleteStartegies = (hasMultipleAccounts = false) => {
  const stratgies = [
    {
      key: DeleteStrategyT.Archive,
      value: DeleteStrategyT.Archive,
      text: 'Archive account, keep transactions as is'
    },
    {
      key: DeleteStrategyT.Cleanup,
      value: DeleteStrategyT.Cleanup,
      text: 'Delete transactions with account'
    }
  ];
  if (hasMultipleAccounts) {
    stratgies.push({
      key: DeleteStrategyT.Move,
      value: DeleteStrategyT.Move,
      text: 'Move transactions to another account'
    });
  }

  return stratgies;
};

export const formTostate = ({
  id,
  name,
  group,
  balance,
  currencies,
  on_dashboard,
  archived
}: AccountFormT): AccountStateT => {
  return {
    id: id || `A${Date.now()}`,
    name,
    group,
    balance: Object.keys(balance).reduce(
      (acc: AccountStateBalanceT, code: string) => {
        acc[code] = Currency.toInt(
          balance[code] !== '' ? balance[code] : '0',
          code
        );
        return acc;
      },
      {}
    ),
    currencies,
    on_dashboard,
    archived
  };
};

export const stateToForm = (account: AccountStateT): AccountFormT => {
  return {
    ...account,
    balance: Object.keys(account.balance).reduce(
      (acc: AccountFormBalanceT, code: string) => {
        acc[code] = Currency.toFloat(account.balance[code], code, false);
        return acc;
      },
      {}
    )
  };
};

export const storageToState = ({
  _id,
  name,
  group,
  balance,
  currencies,
  on_dashboard,
  archived
}: AccountStorageT): AccountStateT => {
  return {
    id: _id,
    name,
    group,
    balance,
    currencies,
    on_dashboard,
    archived
  };
};

export const stateToStorage = ({
  name,
  group,
  balance,
  currencies,
  on_dashboard,
  archived
}: AccountStateT) => {
  return { name, group, balance, currencies, on_dashboard, archived };
};

export const mutateBalance = (
  account: AccountStorageT,
  currency: string,
  amount: number
): AccountStorageT => {
  return {
    ...account,
    currencies: [...new Set([...account.currencies, currency])],
    balance: {
      ...account.balance,
      [currency]: parseInt(`${account.balance[currency] || 0}`, 10) + amount
    }
  };
};
