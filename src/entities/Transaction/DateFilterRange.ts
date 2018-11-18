import subDays from 'date-fns/sub_days';
import startOfToday from 'date-fns/start_of_today';
import endOfToday from 'date-fns/end_of_today';
import startOfYesterday from 'date-fns/start_of_yesterday';
import endOfYesterday from 'date-fns/end_of_yesterday';
import startOfMonth from 'date-fns/start_of_month';

export enum DateFilterRangeT {
  today,
  yesterday,
  lastWeek,
  lastMonth,
  thisMonth,
  custom
}

interface DateFilterItemT {
  text: string;
  start: () => Date;
  end: () => Date;
}

function daysFromToday(days: number) {
  return () => subDays(startOfToday(), days);
}

function firstDayOfThisMonth() {
  const date = new Date();

  return startOfMonth(date);
}

const lastWeek = daysFromToday(7);
const lastMonth = daysFromToday(30);

const DateFilterRangeMap: { [range in DateFilterRangeT]: DateFilterItemT } = {
  [DateFilterRangeT.today]: {
    text: 'Today',
    start: startOfToday,
    end: endOfToday
  },
  [DateFilterRangeT.yesterday]: {
    text: 'Yesterday',
    start: startOfYesterday,
    end: endOfYesterday
  },
  [DateFilterRangeT.lastWeek]: {
    text: 'Last 7 days',
    start: lastWeek,
    end: endOfToday
  },
  [DateFilterRangeT.lastMonth]: {
    text: 'Last 30 days',
    start: lastMonth,
    end: endOfToday
  },
  [DateFilterRangeT.thisMonth]: {
    text: 'This month',
    start: firstDayOfThisMonth,
    end: endOfToday
  },
  [DateFilterRangeT.custom]: {
    text: 'Custom date',
    start: startOfToday,
    end: endOfToday
  }
};

export const defaultDateFilterRange = DateFilterRangeT.lastWeek;
export const defaultStart = DateFilterRangeMap[defaultDateFilterRange].start;
export const defaultEnd = DateFilterRangeMap[defaultDateFilterRange].end;

export function getDateFilterRangeStart(key: DateFilterRangeT) {
  return DateFilterRangeMap[key].start();
}

export function getDateFilterRangeEnd(key: DateFilterRangeT) {
  return DateFilterRangeMap[key].end();
}

export function getDateRangeFilterOptions() {
  return Object.entries(DateFilterRangeMap).map(([key, { text }]) => ({
    key,
    value: parseInt(key),
    text
  }));
}
