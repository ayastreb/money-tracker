import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'
import { REPORT_EXPENSE_INCOME } from '../../entities/Report'
import ExpenseIncome from './Kind/ExpenseIncome'
import './index.css'

class Report extends React.Component {
  render() {
    return (
      <div className="ct-octave mt-report">
        <Loader active={this.props.isLoading} />

        {!this.props.isLoading && this.renderReportByKind()}
      </div>
    )
  }

  renderReportByKind() {
    switch (this.props.kind) {
      case REPORT_EXPENSE_INCOME:
        return <ExpenseIncome {...this.props} />
      default:
        return 'Not available'
    }
  }
}

Report.propTypes = {
  isLoading: PropTypes.bool,
  currency: PropTypes.string,
  kind: PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    series: PropTypes.array
  })
}

export default Report
