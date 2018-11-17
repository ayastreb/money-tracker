import { accountsDB, remoteAccountsDB, destroyAccountsDB } from './pouchdb';
import {
  storageToState,
  stateToStorage,
  mutateBalance as mutateAccountBalance
} from '../../entities/Account';

export default {
  sync,
  loadAll,
  save,
  archive,
  mutateBalance,
  remove,
  destroy
};

async function sync(readOnly = false) {
  if (!remoteAccountsDB()) return;
  let accounts;

  const from = await accountsDB().replicate.from(remoteAccountsDB());
  if (from.docs_written > 0) {
    accounts = await loadAll();
    updateLastSyncedBalance(accounts);
  }

  if (readOnly) return;

  const to = await accountsDB().replicate.to(remoteAccountsDB());
  if (to.docs_written > 0) {
    accounts = await loadAll();
    updateLastSyncedBalance(accounts);
  }
}

function destroy() {
  return destroyAccountsDB();
}

function loadAll() {
  return accountsDB()
    .allDocs({
      include_docs: true,
      conflicts: true,
      startkey: 'A',
      endkey: 'A\uffff'
    })
    .then(response => Promise.all(response.rows.map(resolveConflicts)))
    .then(docs => docs.map(storageToState));
}

function save(account) {
  return accountsDB()
    .get(account.id)
    .then(doc => accountsDB().put({ ...doc, ...stateToStorage(account) }))
    .catch(err => {
      if (err.status !== 404) throw err;
      return accountsDB().put({
        _id: account.id,
        ...stateToStorage(account)
      });
    });
}

function archive(accountId) {
  return accountsDB()
    .get(accountId)
    .then(doc => accountsDB().put({ ...doc, archived: true }));
}

function mutateBalance({ accountId, currency, amount }) {
  return accountsDB()
    .get(accountId)
    .then(doc => accountsDB().put(mutateAccountBalance(doc, currency, amount)))
    .then(({ rev }) => accountsDB().get(accountId, rev))
    .then(doc => storageToState(doc));
}

function remove(accountId) {
  return accountsDB()
    .get(accountId)
    .then(doc => accountsDB().put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err;
      return true;
    });
}

function updateLastSyncedBalance(accounts) {
  accounts.forEach(account => {
    localStorage.setItem(account.id, JSON.stringify(account.balance));
  });
}

async function resolveConflicts(row) {
  if (!row.doc._conflicts) return row.doc;

  const lastSyncedBalance = JSON.parse(localStorage.getItem(row.doc._id));
  const conflictedBalances = await Promise.all(
    row.doc._conflicts.map(async rev =>
      accountsDB()
        .get(row.doc._id, { rev })
        .then(doc => doc.balance)
    )
  );
  conflictedBalances.push(row.doc.balance);
  row.doc.balance = resolveBalance(lastSyncedBalance, conflictedBalances);

  return Promise.all(
    row.doc._conflicts.map(async rev => accountsDB().remove(row.doc._id, rev))
  )
    .then(() => accountsDB().put(row.doc))
    .then(() => row.doc);
}

function resolveBalance(lastSynced, conflictedBalances) {
  return Object.keys(lastSynced).reduce((balance, code) => {
    balance[code] =
      lastSynced[code] +
      conflictedBalances.reduce(
        (delta, conflicted) => delta + (conflicted[code] - lastSynced[code]),
        0
      );
    return balance;
  }, {});
}
