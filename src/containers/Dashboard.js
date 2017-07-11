import React from 'react'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'
import Amount from '../components/Amount'
import AccountsWidget from '../components/AccountsWidget'
import AddTransaction from './AddTransaction'
import RecentTransactions from './RecentTransactions'
import { getGroupedAccounts, getNetWorth } from '../selectors/accounts'
import { toggleSectionCollapse } from '../actions/settings'

const NET_WORTH = 'net_worth'
const ADD_TRANSACTION = 'add_transaction'
const RECENT = 'recent_transactions'

class Dashboard extends React.Component {
  toggle = section => () => this.props.toggleSectionCollapse(section)
  isCollapsed = section => this.props.collapsedSections.includes(section)
  icon = section => (this.isCollapsed(section) ? 'caret right' : 'caret down')

  render() {
    return (
      <div className="container-full-page">
        <Grid>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16}>
              {this.renderNetWorth()}
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              {this.renderAddTransaction()}
              {this.renderRecentTransactions()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

  renderNetWorth() {
    return (
      <div className="section net-worth">
        <div className="section__header" onClick={this.toggle(NET_WORTH)}>
          <Icon name={this.icon(NET_WORTH)} />
          <h3>Net Worth</h3>
          <div className="net-worth__total">
            <Amount
              value={this.props.netWorth}
              code={this.props.baseCurrency}
            />
          </div>
        </div>
        {!this.isCollapsed(NET_WORTH) &&
          <div className="section__body">
            <AccountsWidget
              baseCurrency={this.props.baseCurrency}
              groups={this.props.groups}
              collapsedGroups={this.props.collapsedSections}
              toggleGroupCollapse={this.props.toggleSectionCollapse}
            />
          </div>}
      </div>
    )
  }

  renderAddTransaction() {
    return (
      <div className="section transaction-form">
        <div className="section__header" onClick={this.toggle(ADD_TRANSACTION)}>
          <Icon name={this.icon(ADD_TRANSACTION)} />
          <h3>Add Transaction</h3>
        </div>
        {!this.isCollapsed(ADD_TRANSACTION) &&
          <div className="section__body">
            <AddTransaction />
          </div>}
      </div>
    )
  }

  renderRecentTransactions() {
    return (
      <div className="section transactions-list">
        <div className="section__header" onClick={this.toggle(RECENT)}>
          <Icon name={this.icon(RECENT)} />
          <h3>Recent Transactions</h3>
        </div>
        {!this.isCollapsed(RECENT) &&
          <div className="section__body">
            <RecentTransactions />
          </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  collapsedSections: state.settings.collapsedSections,
  baseCurrency: state.settings.currency.base,
  groups: getGroupedAccounts(state),
  netWorth: getNetWorth(state)
})

export default connect(mapStateToProps, { toggleSectionCollapse })(Dashboard)
