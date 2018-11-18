import { TransactionStateT, TransationKindT } from 'entities/Transaction';

const { Transfer } = TransationKindT;

export interface AccountMutationT {
  accountId: string;
  currency: string;
  amount: number;
}

/**
 * Get all necessary accounts balance mutations for given transaction change.
 */
export default function getAccountsMutations(
  prev?: TransactionStateT,
  next?: TransactionStateT
): AccountMutationT[] {
  if (!prev && next) {
    return createTransaction(next);
  } else if (prev && !next) {
    return removeTransaction(prev);
  } else if (prev && next) {
    return [...removeTransaction(prev), ...createTransaction(next)];
  } else {
    return [];
  }
}

function createTransaction(transaction: TransactionStateT): AccountMutationT[] {
  const mutations: AccountMutationT[] = [];
  if (
    transaction.kind === Transfer &&
    transaction.accountId === transaction.linkedAccountId &&
    transaction.currency === transaction.linkedCurrency
  ) {
    return mutations;
  }

  mutations.push({
    accountId: transaction.accountId,
    currency: transaction.currency,
    amount: transaction.amount * (transaction.kind === Transfer ? -1 : 1)
  });

  if (
    transaction.kind === Transfer &&
    transaction.linkedAccountId &&
    transaction.linkedCurrency &&
    transaction.linkedAmount
  ) {
    mutations.push({
      accountId: transaction.linkedAccountId,
      currency: transaction.linkedCurrency,
      amount: transaction.linkedAmount
    });
  }

  return mutations;
}

function removeTransaction(transaction: TransactionStateT): AccountMutationT[] {
  const mutations = [];
  mutations.push({
    accountId: transaction.accountId,
    currency: transaction.currency,
    amount: transaction.amount * (transaction.kind === Transfer ? 1 : -1)
  });
  if (
    transaction.kind === Transfer &&
    transaction.linkedAccountId &&
    transaction.linkedCurrency &&
    transaction.linkedAmount
  ) {
    mutations.push({
      accountId: transaction.linkedAccountId,
      currency: transaction.linkedCurrency,
      amount: transaction.linkedAmount * -1
    });
  }

  return mutations;
}
