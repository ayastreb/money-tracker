import React from 'react'
import CurrencySettings from './Currency'
import DataImport from './DataImport'
import CollapsibleSection from '../../components/CollapsibleSection'

const Accounts = () => (
  <div className="container-full-page">
    <CollapsibleSection name="settings_currency" label="Currency">
      <CurrencySettings />
    </CollapsibleSection>
    <CollapsibleSection name="settings_import" label="Data Import">
      <DataImport />
    </CollapsibleSection>
  </div>
)

export default Accounts
