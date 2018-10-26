import Report from '../../entities/Report'

export const getReport = state => state.ui.report
export const getTimespanLabel = state => {
  return Report.timespanLabel(
    state.ui.report.date.end,
    state.ui.report.timespan
  )
}
