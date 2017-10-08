import React from 'react'
import CurrencySettings from './Currency'
import DataImport from './DataImport'
import User from './User'
import CollapsibleSection from '../../components/CollapsibleSection'

const Settings = () => (
  <div className="container-full-page">
    <CollapsibleSection name="settings_currency" label="Currency">
      <CurrencySettings />
    </CollapsibleSection>
    <CollapsibleSection name="settings_import" label="Data Import">
      <DataImport />
    </CollapsibleSection>
    <CollapsibleSection name="settings_user" label="User Settings">
      <User />
    </CollapsibleSection>
  </div>
)

export default Settings
