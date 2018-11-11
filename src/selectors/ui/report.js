import Report from '../../entities/Report'

export const getReport = state => state.ui.report
export const getTimespanLabel = state => {
  let startdate = new Date(state.ui.report.date.start);
  startdate.setDate(startdate.getDate()+1);
  return Report.timespanLabel(
    startdate,
    state.ui.report.timespan
  )
}
