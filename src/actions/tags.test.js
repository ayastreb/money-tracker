import {
  loadExpenseTags,
  loadExpenseTagsSuccess,
  loadIncomeTags,
  loadIncomeTagsSuccess
} from './tags'

it('creates load expense tags action', () => {
  expect(loadExpenseTags()).toEqual({
    type: 'LOAD_EXPENSE_TAGS'
  })
})

it('creates load expense tags success action', () => {
  expect(loadExpenseTagsSuccess('foo')).toEqual({
    type: 'LOAD_EXPENSE_TAGS_SUCCESS',
    payload: 'foo'
  })
})

it('creates load income tags  action', () => {
  expect(loadIncomeTags()).toEqual({
    type: 'LOAD_INCOME_TAGS'
  })
})

it('creates load income tags success action', () => {
  expect(loadIncomeTagsSuccess('foo')).toEqual({
    type: 'LOAD_INCOME_TAGS_SUCCESS',
    payload: 'foo'
  })
})
