import Storage from './pouchdb'

export async function retrieveAccounts() {
  return Storage.accountsDB()
    .allDocs({ include_docs: true })
    .then(response => response.rows.map(row => row.doc))
}

export async function persistAccount(account) {
  return Storage.accountsDB()
    .get(account.id)
    .then(doc => Storage.accountsDB().put({ ...doc, ...account }))
    .catch(err => {
      if (err.status !== 404) throw err
      return Storage.accountsDB().put({ _id: account.id, ...account })
    })
}

export async function deleteAccount(id) {
  return Storage.accountsDB()
    .get(id)
    .then(doc => Storage.accountsDB().put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}
