import {
  UPDATE_SYNC_SETTINGS,
  LOAD_SETTINGS_SUCCESS
} from '../../actions/settings'

import reducer from './sync'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    databases: {},
    host: '',
    key: '',
    password: ''
  })
})

it('updates sync settings', () => {
  expect(
    reducer(undefined, {
      type: UPDATE_SYNC_SETTINGS,
      settings: { host: 'foo' }
    })
  ).toEqual({
    host: 'foo'
  })
})

it('loads sync settings', () => {
  expect(
    reducer(undefined, {
      type: LOAD_SETTINGS_SUCCESS,
      settings: { sync: { host: 'foo' } }
    })
  ).toEqual({
    host: 'foo'
  })
})
