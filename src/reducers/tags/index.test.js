import reducer from './'
import { LOAD_MOST_USED_TAGS, USE_TAG } from '../../actions/tags'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({ mostUsed: [] })
})


it('loads most used tags', () => {
  expect(
    reducer(
      { mostUsed: [] },
      { type: LOAD_MOST_USED_TAGS, tags: ['food', 'groceries'] }
    )
  ).toEqual({ mostUsed: ['food', 'groceries'] })
})

it('adds used tag to most used', () => {
  expect(
    reducer(
      { mostUsed: ['food', 'groceries'] },
      { type: USE_TAG, tag: 'rent' }
    )
  ).toEqual({ mostUsed: ['food', 'groceries', 'rent'] })
})

it('does not add used tag to most used tags if it is already there', () => {
  expect(
    reducer(
      { mostUsed: ['food', 'groceries'] },
      { type: USE_TAG, tag: 'food' }
    )
  ).toEqual({ mostUsed: ['food', 'groceries'] })
})
