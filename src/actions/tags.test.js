import {
  LOAD_EXPENSE_TAGS,
  LOAD_EXPENSE_TAGS_FAILURE,
  LOAD_INCOME_TAGS,
  LOAD_INCOME_TAGS_FAILURE,
  USE_EXPENSE_TAG,
  USE_EXPENSE_TAG_FAILURE,
  USE_INCOME_TAG,
  USE_INCOME_TAG_FAILURE,
  loadExpenseTags,
  loadIncomeTags,
  useIncomeTag,
  useExpenseTag
} from './tags'
import { mockStore, rejectPromise, resolvePromise } from '../util/test/helper'
import * as tags from '../util/storage/tags'

let store

beforeEach(() => (store = mockStore()))

describe('loading expense tags', () => {
  it('creates LOAD_EXPENSE_TAGS action', () => {
    const expectedTags = ['food', 'shopping']
    tags.retrieveTags = jest.fn(resolvePromise(expectedTags))

    return store.dispatch(loadExpenseTags()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_EXPENSE_TAGS, tags: expectedTags }
      ])
    })
  })

  it('creates LOAD_EXPENSE_TAGS_FAILURE when failed to load tags', () => {
    const error = new Error()
    tags.retrieveTags = jest.fn(rejectPromise(error))

    return store.dispatch(loadExpenseTags()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_EXPENSE_TAGS_FAILURE, error }
      ])
    })
  })
})

describe('loading income tags', () => {
  it('creates LOAD_INCOME_TAGS action', () => {
    const expectedTags = ['salary', 'dividends']
    tags.retrieveTags = jest.fn(resolvePromise(expectedTags))

    return store.dispatch(loadIncomeTags()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_INCOME_TAGS, tags: expectedTags }
      ])
    })
  })

  it('creates LOAD_INCOME_TAGS_FAILURE when failed to load tags', () => {
    const error = new Error()
    tags.retrieveTags = jest.fn(rejectPromise(error))

    return store.dispatch(loadIncomeTags()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_INCOME_TAGS_FAILURE, error }
      ])
    })
  })
})

describe('increasing expense tag usage', () => {
  it('creates USE_EXPENSE_TAG action', () => {
    tags.increaseTagUsage = jest.fn(resolvePromise(true))

    return store.dispatch(useExpenseTag('food')).then(() => {
      expect(store.getActions()).toEqual([
        { type: USE_EXPENSE_TAG, tag: 'food' }
      ])
    })
  })

  it('creates USE_EXPENSE_TAG_FAILURE when failed to increase tag usage', () => {
    const error = new Error()
    tags.increaseTagUsage = jest.fn(rejectPromise(error))

    return store.dispatch(useExpenseTag('food')).then(() => {
      expect(store.getActions()).toEqual([
        { type: USE_EXPENSE_TAG_FAILURE, error }
      ])
    })
  })
})

describe('increasing income tag usage', () => {
  it('creates USE_INCOME_TAG action', () => {
    tags.increaseTagUsage = jest.fn(resolvePromise(true))

    return store.dispatch(useIncomeTag('salary')).then(() => {
      expect(store.getActions()).toEqual([
        { type: USE_INCOME_TAG, tag: 'salary' }
      ])
    })
  })

  it('creates USE_INCOME_TAG_FAILURE when failed to increase tag usage', () => {
    const error = new Error()
    tags.increaseTagUsage = jest.fn(rejectPromise(error))

    return store.dispatch(useIncomeTag('salary')).then(() => {
      expect(store.getActions()).toEqual([
        { type: USE_INCOME_TAG_FAILURE, error }
      ])
    })
  })
})
