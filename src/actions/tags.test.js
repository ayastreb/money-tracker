import { loadExpenseTagsSuccess, loadIncomeTagsSuccess } from './tags'

it('creates load expense tags success action', () => {
  expect(loadExpenseTagsSuccess('foo')).toEqual({
    type: 'LOAD_EXPENSE_TAGS_SUCCESS',
    payload: 'foo'
  })
})

it('creates load income tags success action', () => {
  expect(loadIncomeTagsSuccess('foo')).toEqual({
    type: 'LOAD_INCOME_TAGS_SUCCESS',
    payload: 'foo'
  })
})
