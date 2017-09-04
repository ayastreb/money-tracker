import reducer from './tags'
import {
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from '../../actions/entities/tags'
import { addTag } from '../../actions/ui/form/transaction'
import { EXPENSE, TRANSFER, INCOME } from '../../entities/Transaction'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    [EXPENSE]: [],
    [TRANSFER]: [],
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
      addTag({ kind: EXPENSE, tag: 'rent' })
    )
  ).toEqual({ [EXPENSE]: ['food', 'groceries', 'rent'] })
})

it('adds tag to income tags', () => {
  expect(
    reducer(
      { [INCOME]: ['salary'] },
      addTag({ kind: INCOME, tag: 'dividends' })
    )
  ).toEqual({
    [INCOME]: ['salary', 'dividends']
  })
})

it('does not add used tag if it is already there', () => {
  expect(
    reducer(
      { [EXPENSE]: ['food', 'groceries'] },
      addTag({ kind: EXPENSE, tag: 'food' })
    )
  ).toEqual({ [EXPENSE]: ['food', 'groceries'] })
})
