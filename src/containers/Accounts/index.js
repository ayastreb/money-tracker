import React from 'react'
import NetWorth from '../Dashboard/NetWorth'
import CollapsibleSection from '../../components/CollapsibleSection'
import AccountsList from './List'

const Accounts = () => (
  <div className="container-full-page">
    <CollapsibleSection
      name="account_list"
      label="Accounts"
      LabelComponent={NetWorth}
    >
      <AccountsList withNewButton />
    </CollapsibleSection>
  </div>
)

export default Accounts
