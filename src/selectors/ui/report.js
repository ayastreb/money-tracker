import { timespanLabel } from 'entities/Report';

export const getReport = state => state.ui.report;
export const getTimespanLabel = state => {
  const startDate = new Date(state.ui.report.date.start);
  startDate.setDate(startDate.getDate() + 1);
  return timespanLabel(startDate, state.ui.report.timespan);
};
