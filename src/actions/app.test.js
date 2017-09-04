import { bootstrap } from './app'

it('creates bootstrap action', () => {
  expect(bootstrap()).toEqual({
    type: 'BOOTSTRAP'
  })
})
