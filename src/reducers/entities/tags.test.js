import reducer from './tags';
import {
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from '../../actions/entities/tags';
import { addTag } from '../../actions/ui/form/transaction';
import { TransationKindT } from '../../entities/Transaction';

const { Expense, Transfer, Income } = TransationKindT;

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    [Expense]: [],
    [Transfer]: [],
    [Income]: []
  });
});

it('loads expense tags', () => {
  expect(
    reducer({ [Expense]: [] }, loadExpenseTagsSuccess(['food', 'groceries']))
  ).toEqual({
    [Expense]: ['food', 'groceries']
  });
});

it('loads income tags', () => {
  expect(
    reducer({ [Income]: [] }, loadIncomeTagsSuccess(['salary', 'dividends']))
  ).toEqual({
    [Income]: ['salary', 'dividends']
  });
});

it('adds tag to expense tags', () => {
  expect(
    reducer(
      { [Expense]: ['food', 'groceries'] },
      addTag({ kind: Expense, tag: 'rent' })
    )
  ).toEqual({ [Expense]: ['food', 'groceries', 'rent'] });
});

it('adds tag to income tags', () => {
  expect(
    reducer(
      { [Income]: ['salary'] },
      addTag({ kind: Income, tag: 'dividends' })
    )
  ).toEqual({
    [Income]: ['salary', 'dividends']
  });
});

it('does not add used tag if it is already there', () => {
  expect(
    reducer(
      { [Expense]: ['food', 'groceries'] },
      addTag({ kind: Expense, tag: 'food' })
    )
  ).toEqual({ [Expense]: ['food', 'groceries'] });
});
