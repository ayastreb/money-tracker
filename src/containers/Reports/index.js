import React from 'react'
import { connect } from 'react-redux'
import { loadReport } from '../../actions/ui/report'
import { loadAccounts } from '../../actions/entities/accounts'
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
        <div className="container-header">
          <Navigation />
        </div>

        <div
          style={{
            border: 'dotted 1px #dcdcdc',
            margin: '1em',
            height: '65vh'
          }}
        >
          <Report isLoading={this.props.isLoading} />
        </div>

        <div className="container-footer">
          <Filter />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.ui.report.isLoading
})

export default connect(mapStateToProps, { loadAccounts, loadReport })(Reports)
