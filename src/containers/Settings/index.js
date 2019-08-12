import React from 'react';
import CurrencyInput from './Currency/Input';
import CurrenchExchangeRate from './Currency/ExchangeRate';
import DataExport from './DataExport';
import DataImport from './DataImport';
import User from './User';
import CollapsibleSection from '../../components/CollapsibleSection';

const Settings = () => (
  <div className="container-full-page mt-settings">
    <CollapsibleSection name="settings_currency" label="Currency">
      <CurrencyInput />
      <CurrenchExchangeRate />
    </CollapsibleSection>
    <CollapsibleSection name="settings_import" label="Data Import">
      <DataImport />      
    </CollapsibleSection>
    <CollapsibleSection name="settings_export" label="Data Export">
      <DataExport />
      </CollapsibleSection>
    <CollapsibleSection name="settings_user" label="User">
      <User />
    </CollapsibleSection>
  </div>
);

export default Settings;
