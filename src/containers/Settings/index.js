import React from 'react'
import CurrencySettings from './Currency'
import CollapsibleSection from '../../components/CollapsibleSection'

const Accounts = () => (
  <div className="container-full-page">
    <CollapsibleSection name="settings_currency" label="Currency">
      <CurrencySettings />
    </CollapsibleSection>
  </div>
)

export default Accounts
