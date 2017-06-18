import { accountsDB } from './pouchdb'

export async function retrieveAccounts() {
  return accountsDB()
    .allDocs({ include_docs: true })
    .then(response => response.rows.map(row => row.doc))
}

export async function persistAccount(account) {
  return accountsDB()
    .get(account.id)
    .then(doc => accountsDB().put({ ...doc, ...account }))
    .catch(err => {
      if (err.status !== 404) throw err
      return accountsDB().put({ _id: account.id, ...account })
    })
}

export async function deleteAccount(id) {
  return accountsDB()
    .get(id)
    .then(doc => accountsDB().put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}
