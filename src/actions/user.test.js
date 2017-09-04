import { userLoggedIn } from './user'

it('creates user is logged in action', () => {
  expect(userLoggedIn()).toEqual({
    type: 'USER_LOGGED_IN'
  })
})
