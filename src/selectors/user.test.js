import { isUserAuthenticated } from './user'

it('gets user auth status', () => {
  const state = {
    user: {
      isAuthenticated: true
    }
  }

  expect(isUserAuthenticated(state)).toEqual(true)
})
