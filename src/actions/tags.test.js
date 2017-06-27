import {
  LOAD_MOST_USED_TAGS,
  LOAD_MOST_USED_TAGS_FAILURE,
  USE_TAG,
  USE_TAG_FAILURE,
  loadMostUsedTags,
  useTag
} from './tags'
import { mockStore, rejectPromise, resolvePromise } from '../util/test/helper'
import * as tags from '../util/storage/tags'

let store

beforeEach(() => (store = mockStore()))

describe('loading most used tags', () => {
  it('creates LOAD_MOST_USED_TAGS action', () => {
    const expectedTags = ['food', 'shopping']
    tags.retrieveMostUsedTags = jest.fn(resolvePromise(expectedTags))

    return store.dispatch(loadMostUsedTags()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_MOST_USED_TAGS, tags: expectedTags }
      ])
    })
  })

  it('creates LOAD_MOST_USED_TAGS_FAILURE when failed to load tags', () => {
    const error = new Error()
    tags.retrieveMostUsedTags = jest.fn(rejectPromise(error))

    return store.dispatch(loadMostUsedTags()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_MOST_USED_TAGS_FAILURE, error }
      ])
    })
  })
})

describe('increasing tag usage', () => {
  it('creates USE_TAG action', () => {
    tags.increaseTagUsage = jest.fn(resolvePromise(true))

    return store.dispatch(useTag('food')).then(() => {
      expect(store.getActions()).toEqual([{ type: USE_TAG, tag: 'food' }])
    })
  })

  it('creates USE_TAG_FAILURE when failed to increase tag usage', () => {
    const error = new Error()
    tags.increaseTagUsage = jest.fn(rejectPromise(error))

    return store.dispatch(useTag('food')).then(() => {
      expect(store.getActions()).toEqual([{ type: USE_TAG_FAILURE, error }])
    })
  })
})
