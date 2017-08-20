import React from 'react'
import { Grid } from 'semantic-ui-react'
import CollapsibleSection from '../../components/CollapsibleSection'
import NetWorth from './NetWorth'
import AccountsWidget from './AccountsWidget'
import AddTransaction from './AddTransaction'
import RecentTransactions from './RecentTransactions'

const Dashboard = () => (
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

export default Dashboard
