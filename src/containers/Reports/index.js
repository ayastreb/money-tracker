import React from 'react'
import { connect } from 'react-redux'
import { loadReport } from '../../actions/ui/report'
import { loadAccounts } from '../../actions/entities/accounts'
import { getBaseCurrencySymbol } from '../../selectors/settings'
import Report from '../../components/Report'
import Navigation from './Navigation'
import Filter from './Filter'

class Reports extends React.Component {
  componentWillMount() {
    this.props.loadAccounts()
    this.props.loadReport()
  }

  render() {
    return (
      <div className="container-full-page flat">
        <Navigation />
        <Report {...this.props} />
        <Filter />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.ui.report.isLoading,
  currency: getBaseCurrencySymbol(state),
  kind: state.ui.report.kind,
  data: state.ui.report.data
})

export default connect(mapStateToProps, { loadAccounts, loadReport })(Reports)
