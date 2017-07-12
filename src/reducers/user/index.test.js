import reducer from './'
import { LocalStorageMock } from '../../util/test/helper'

global.localStorage = new LocalStorageMock()

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({ isAuthenticated: false })
})
