import AccountsDB from './db/accounts'

export async function retrieveAccounts() {
  return AccountsDB.allDocs({ include_docs: true }).then(
    response => response.rows.map(row => row.doc)
  )
}

export async function persistAccount(account) {
  return AccountsDB.get(account.id)
    .then(doc => AccountsDB.put({ ...doc, ...account }))
    .catch(err => {
      if (err.status !== 404) throw err
      return AccountsDB.put({ _id: account.id, ...account })
    })
}

export async function deleteAccount(id) {
  return AccountsDB.get(id)
    .then(doc => AccountsDB.put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}
