export async function persistAccount(account) {
  // TODO: implement saving to PouchDB
  return new Promise((resolve, reject) => resolve(account))
}

export async function deleteAccount(id) {
  // TODO: implement deleting from PouchDB
  return new Promise((resolve, reject) => resolve(true))
}
