import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Header from '../components/Header'
import NetWorth from '../components/NetWorth'
import AccountsWidget from '../components/AccountsWidget'
import { getGroupedAccounts, getNetWorth } from '../selectors/accounts'
import { toggleGroupCollapse } from '../actions/ui/accountsWidget'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header label="Dashboard" />
        <div className="container-full-page">
          <Grid>
            <Grid.Row>
              <Grid.Column computer={6} largeScreen={5} mobile={16}>
                <NetWorth
                  baseCurrency={this.props.baseCurrency}
                  netWorth={this.props.netWorth}
                />
                <AccountsWidget
                  baseCurrency={this.props.baseCurrency}
                  groups={this.props.groups}
                  collapsedGroups={this.props.collapsedGroups}
                  toggleGroupCollapse={this.props.toggleGroupCollapse}
                />
              </Grid.Column>
              <Grid.Column computer={10} largeScreen={11} mobile={16}>
                <div className="placeholder" style={{ height: '250px' }}>
                  New Transaction
                </div>
                <div className="placeholder" style={{ height: '300px' }}>
                  Transaction List
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  baseCurrency: state.settings.currency.base,
  groups: getGroupedAccounts(state),
  collapsedGroups: state.ui.accountsWidget.collapsedGroups,
  netWorth: getNetWorth(state)
})

export default connect(mapStateToProps, { toggleGroupCollapse })(Dashboard)
