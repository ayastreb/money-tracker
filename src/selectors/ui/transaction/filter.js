import format from 'date-fns/format';
import { createSelector } from 'reselect';
import {
  pagerSizeMobile,
  pagerSizeDesktop
} from '../../../entities/Transaction';
import { toLocalTimestamp } from '../../../util/timezone';

export const getDateLabel = state => {
  const dateStart = toLocalTimestamp(state.ui.transaction.filter.dateStart);
  const dateEnd = toLocalTimestamp(state.ui.transaction.filter.dateEnd);
  return format(dateStart, 'DD MMM') !== format(dateEnd, 'DD MMM')
    ? `${format(dateStart, 'DD MMM')} — ${format(dateEnd, 'DD MMM')}`
    : format(dateStart, 'MMMM, Do');
};

export const getFilters = state => ({
  date: {
    start: state.ui.transaction.filter.dateStart,
    end: state.ui.transaction.filter.dateEnd
  },
  accounts: new Set(state.ui.transaction.filter.applied.accounts),
  tags: state.ui.transaction.filter.applied.tags || []
});

export const getPage = state => state.ui.transaction.filter.page;

export const getLastPage = state => {
  return Math.ceil(
    state.ui.transaction.filter.totalRows / state.ui.transaction.filter.perPage
  );
};

export const getPagerSize = state =>
  state.ui.isMobile ? pagerSizeMobile : pagerSizeDesktop;

export const getVisiblePages = createSelector(
  getPage,
  getLastPage,
  getPagerSize,
  (current, last, size) => {
    const pages = [];
    const offset = Math.max(0, last - current - Math.ceil(size / 2));
    const windowRight = last > size ? Math.max(size, last - offset) : last;
    const windowLeft = Math.max(0, windowRight - size);

    for (let page = windowLeft; page < windowRight; page++) {
      pages.push(page);
    }

    return pages;
  }
);
