import {
  loadTags,
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from './tags';

it('creates load tags action', () => {
  expect(loadTags()).toEqual({
    type: 'LOAD_TAGS'
  });
});

it('creates load expense tags success action', () => {
  expect(loadExpenseTagsSuccess('foo')).toEqual({
    type: 'LOAD_EXPENSE_TAGS_SUCCESS',
    payload: 'foo'
  });
});

it('creates load income tags success action', () => {
  expect(loadIncomeTagsSuccess('foo')).toEqual({
    type: 'LOAD_INCOME_TAGS_SUCCESS',
    payload: 'foo'
  });
});
