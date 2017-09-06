import React from 'react'
import NetWorth from '../Dashboard/NetWorth'
import CollapsibleSection from '../../components/CollapsibleSection'
import AccountsWidget from '../Dashboard/AccountsWidget'

const Accounts = props => (
  <div className="container-full-page">
    <CollapsibleSection
      name="account_list"
      label="Accounts"
      LabelComponent={NetWorth}
    >
      <AccountsWidget />
    </CollapsibleSection>
  </div>
)

export default Accounts
