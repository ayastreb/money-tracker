import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import CollapsibleSection from '../../components/CollapsibleSection'
import NetWorth from './NetWorth'
import Accounts from './Accounts'
import AddTransaction from './AddTransaction'
import RecentTransactions from './RecentTransactions'
import { loadAccounts } from '../../actions/entities/accounts'
import { loadRecentTransactions } from '../../actions/entities/transactions'
import { getDashboardAccountsList } from '../../selectors/entities/accounts'

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
                {this.props.accounts.length > 0 && <Accounts withNewButton />}
              </CollapsibleSection>
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <CollapsibleSection name="add_tx" label="Add Transaction">
                {this.props.accounts.length > 0 && <AddTransaction />}
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
  accounts: PropTypes.array,
  loadAccounts: PropTypes.func,
  loadRecentTransactions: PropTypes.func
}

const mapStateToProps = state => ({
  accounts: getDashboardAccountsList(state)
})

export default connect(mapStateToProps, {
  loadAccounts,
  loadRecentTransactions
})(Dashboard)
