import reducer from './tags'
import { loadExpenseTagsSuccess, loadIncomeTagsSuccess } from '../actions/tags'
import { ADD_INCOME_TAG, ADD_EXPENSE_TAG } from '../actions/ui/transactionForm'
import { EXPENSE, INCOME } from '../models/Transaction'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    [EXPENSE]: [],
    [INCOME]: []
  })
})

it('loads expense tags', () => {
  expect(
    reducer({ [EXPENSE]: [] }, loadExpenseTagsSuccess(['food', 'groceries']))
  ).toEqual({ [EXPENSE]: ['food', 'groceries'] })
})

it('loads income tags', () => {
  expect(
    reducer({ [INCOME]: [] }, loadIncomeTagsSuccess(['salary', 'dividends']))
  ).toEqual({ [INCOME]: ['salary', 'dividends'] })
})

it('adds tag to expense tags', () => {
  expect(
    reducer(
      { [EXPENSE]: ['food', 'groceries'] },
      { type: ADD_EXPENSE_TAG, tag: 'rent' }
    )
  ).toEqual({ [EXPENSE]: ['food', 'groceries', 'rent'] })
})

it('adds tag to income tags', () => {
  expect(
    reducer(
      { [INCOME]: ['salary'] },
      { type: ADD_INCOME_TAG, tag: 'dividends' }
    )
  ).toEqual({ [INCOME]: ['salary', 'dividends'] })
})

it('does not add used tag if it is already there', () => {
  expect(
    reducer(
      { [EXPENSE]: ['food', 'groceries'] },
      { type: ADD_EXPENSE_TAG, tag: 'food' }
    )
  ).toEqual({ [EXPENSE]: ['food', 'groceries'] })
})
