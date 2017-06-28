import reducer from './'
import { LOAD_EXPENSE_TAGS, LOAD_INCOME_TAGS } from '../../actions/tags'
import {
  ADD_INCOME_TAG,
  ADD_EXPENSE_TAG
} from '../../actions/ui/transactionForm'
import {
  EXPENSE_TRANSACTION,
  INCOME_TRANSACTION
} from '../../constants/transaction'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    [EXPENSE_TRANSACTION]: [],
    [INCOME_TRANSACTION]: []
  })
})

it('loads expense tags', () => {
  expect(
    reducer(
      { [EXPENSE_TRANSACTION]: [] },
      { type: LOAD_EXPENSE_TAGS, tags: ['food', 'groceries'] }
    )
  ).toEqual({ [EXPENSE_TRANSACTION]: ['food', 'groceries'] })
})

it('loads income tags', () => {
  expect(
    reducer(
      { [INCOME_TRANSACTION]: [] },
      { type: LOAD_INCOME_TAGS, tags: ['salary', 'dividends'] }
    )
  ).toEqual({ [INCOME_TRANSACTION]: ['salary', 'dividends'] })
})

it('adds tag to expense tags', () => {
  expect(
    reducer(
      { [EXPENSE_TRANSACTION]: ['food', 'groceries'] },
      { type: ADD_EXPENSE_TAG, tag: 'rent' }
    )
  ).toEqual({ [EXPENSE_TRANSACTION]: ['food', 'groceries', 'rent'] })
})

it('adds tag to income tags', () => {
  expect(
    reducer(
      { [INCOME_TRANSACTION]: ['salary'] },
      { type: ADD_INCOME_TAG, tag: 'dividends' }
    )
  ).toEqual({ [INCOME_TRANSACTION]: ['salary', 'dividends'] })
})

it('does not add used tag if it is already there', () => {
  expect(
    reducer(
      { [EXPENSE_TRANSACTION]: ['food', 'groceries'] },
      { type: ADD_EXPENSE_TAG, tag: 'food' }
    )
  ).toEqual({ [EXPENSE_TRANSACTION]: ['food', 'groceries'] })
})
