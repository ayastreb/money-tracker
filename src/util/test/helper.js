import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

export const mockStore = configureMockStore([thunk])

export function rejectPromise(error) {
  return () => new Promise((_, reject) => reject(error))
}

export function resolvePromise(data) {
  return () => new Promise(resolve => resolve(data))
}
