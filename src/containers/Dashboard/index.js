import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import CollapsibleSection from '../../components/CollapsibleSection'
import NetWorth from './NetWorth'
import AccountsWidget from './AccountsWidget'
import AddTransaction from './AddTransaction'
import RecentTransactions from './RecentTransactions'
import { loadAccounts } from '../../actions/accounts'
import { loadRecentTransactions } from '../../actions/transactions'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.loadAccounts()
    this.props.loadRecentTransactions()
  }

  render() {
    return (
      <div className="container-full-page">
        <Grid>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16}>
              <CollapsibleSection
                name="net_worth"
                label="Net Worth"
                LabelComponent={NetWorth}
              >
                <AccountsWidget />
              </CollapsibleSection>
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <CollapsibleSection name="add_tx" label="Add Transaction">
                <AddTransaction />
              </CollapsibleSection>
              <CollapsibleSection name="recent_tx" label="Recent Transactions">
                <RecentTransactions />
              </CollapsibleSection>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  loadAccounts: PropTypes.func,
  loadRecentTransactions: PropTypes.func
}

export default connect(undefined, { loadAccounts, loadRecentTransactions })(
  Dashboard
)
