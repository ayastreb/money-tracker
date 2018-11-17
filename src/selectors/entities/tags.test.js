import { getTagOptions } from './tags';

it('gets expense tag options', () => {
  const state = {
    ui: { form: { transaction: { kind: 'expense' } } },
    entities: { tags: { expense: ['food', 'cafe'], income: ['salary'] } }
  };
  const expectedOptions = [
    {
      key: 'food',
      value: 'food',
      text: 'food'
    },
    {
      key: 'cafe',
      value: 'cafe',
      text: 'cafe'
    }
  ];

  expect(getTagOptions(state)).toEqual(expectedOptions);
});

it('gets income tag options', () => {
  const state = {
    ui: { form: { transaction: { kind: 'income' } } },
    entities: { tags: { expense: ['food', 'cafe'], income: ['salary'] } }
  };
  const expectedOptions = [
    {
      key: 'salary',
      value: 'salary',
      text: 'salary'
    }
  ];

  expect(getTagOptions(state)).toEqual(expectedOptions);
});
