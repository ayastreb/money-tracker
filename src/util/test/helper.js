import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

export const mockStore = configureMockStore([thunk])

export function rejectPromise(error) {
  return () => new Promise((_, reject) => reject(error))
}

export function resolvePromise(data) {
  return () => new Promise(resolve => resolve(data))
}

export class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key]
  }

  setItem(key, value) {
    this.store[key] = value
  }

  removeItem(key) {
    delete this.store[key]
  }
}
