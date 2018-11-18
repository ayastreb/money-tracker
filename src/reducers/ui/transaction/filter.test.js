import reducer from './filter';
import {
  changeFilterDate,
  toggleFilterCalendar
} from 'actions/ui/transaction/filter';
import { defaultStart, defaultEnd } from 'entities/Transaction/DateFilterRange';
import { rowsPerSearchPage } from 'entities/Transaction';
import { toUtcTimestamp } from 'util/timezone';

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    dateStart: toUtcTimestamp(defaultStart()),
    dateEnd: toUtcTimestamp(defaultEnd()),
    isCalendarOpen: false,
    isFilterModalOpen: false,
    applied: {},
    isLoading: false,
    totalRows: 0,
    page: 0,
    perPage: rowsPerSearchPage
  });
});

it('changes filter date range', () => {
  expect(
    reducer(
      {
        dateStart: toUtcTimestamp(new Date('2017-12-03 00:00:00')),
        dateEnd: toUtcTimestamp(new Date('2017-12-03 23:59:59'))
      },
      changeFilterDate({
        dateStart: new Date('2017-12-05 00:00:00'),
        dateEnd: new Date('2017-12-05 23:59:59')
      })
    )
  ).toEqual({
    dateStart: toUtcTimestamp(new Date('2017-12-05 00:00:00')),
    dateEnd: toUtcTimestamp(new Date('2017-12-05 23:59:59')),
    isLoading: true
  });
});

it('toggles calendar visibility', () => {
  expect(reducer({ isCalendarOpen: false }, toggleFilterCalendar())).toEqual({
    isCalendarOpen: true
  });
  expect(reducer({ isCalendarOpen: true }, toggleFilterCalendar())).toEqual({
    isCalendarOpen: false
  });
});
