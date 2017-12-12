import { connect } from 'react-redux'
import Navigation from '../../components/Report/Navigation'
import {
  changeReportKind,
  changeReportTimespan,
  moveReportDateBackwards,
  moveReportDateForwards
} from '../../actions/ui/report'
import { getTimespanLabel } from '../../selectors/ui/report'
import Report from '../../entities/Report'

const mapStateToProps = state => ({
  kind: state.ui.report.kind,
  kindOptions: Report.kindOptions(),
  timespan: state.ui.report.timespan,
  timespanOptions: Report.timespanOptions(),
  timespanLabel: getTimespanLabel(state)
})

export default connect(mapStateToProps, {
  changeReportKind,
  changeReportTimespan,
  moveReportDateBackwards,
  moveReportDateForwards
})(Navigation)
