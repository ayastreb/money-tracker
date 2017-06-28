import { retrieveTags, increaseTagUsage } from '../util/storage/tags'
import {
  INCOME_TRANSACTION,
  EXPENSE_TRANSACTION
} from '../constants/transaction'

export const LOAD_EXPENSE_TAGS = 'LOAD_EXPENSE_TAGS'
export const LOAD_EXPENSE_TAGS_FAILURE = 'LOAD_EXPENSE_TAGS_FAILURE'
export function loadExpenseTags() {
  return async dispatch => {
    try {
      const tags = await retrieveTags(EXPENSE_TRANSACTION)
      dispatch({ type: LOAD_EXPENSE_TAGS, tags })
    } catch (error) {
      dispatch({ type: LOAD_EXPENSE_TAGS_FAILURE, error })
    }
  }
}

export const LOAD_INCOME_TAGS = 'LOAD_INCOME_TAGS'
export const LOAD_INCOME_TAGS_FAILURE = 'LOAD_INCOME_TAGS_FAILURE'
export function loadIncomeTags() {
  return async dispatch => {
    try {
      const tags = await retrieveTags(INCOME_TRANSACTION)
      dispatch({ type: LOAD_INCOME_TAGS, tags })
    } catch (error) {
      dispatch({ type: LOAD_INCOME_TAGS_FAILURE, error })
    }
  }
}

export const USE_EXPENSE_TAG = 'USE_EXPENSE_TAG'
export const USE_EXPENSE_TAG_FAILURE = 'USE_EXPENSE_TAG_FAILURE'
export function useExpenseTag(tag) {
  return async dispatch => {
    try {
      await increaseTagUsage(EXPENSE_TRANSACTION, tag)
      dispatch({ type: USE_EXPENSE_TAG, tag })
    } catch (error) {
      dispatch({ type: USE_EXPENSE_TAG_FAILURE, error })
    }
  }
}

export const USE_INCOME_TAG = 'USE_INCOME_TAG'
export const USE_INCOME_TAG_FAILURE = 'USE_INCOME_TAG_FAILURE'
export function useIncomeTag(tag) {
  return async dispatch => {
    try {
      await increaseTagUsage(INCOME_TRANSACTION, tag)
      dispatch({ type: USE_INCOME_TAG, tag })
    } catch (error) {
      dispatch({ type: USE_INCOME_TAG_FAILURE, error })
    }
  }
}
