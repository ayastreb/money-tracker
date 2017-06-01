import React from 'react'

import { currencySymbol, currencyExponent } from '../../data/currency'
import { Input, Label } from 'semantic-ui-react'
import Cleave from 'cleave.js/react'

const CurrencyInput = ({ value, code, update }) => (
  <Input labelPosition="left" fluid>
    <Label>{currencySymbol(code)}</Label>
    <Cleave
      name={code}
      value={value || ''}
      options={{
        numeral: true,
        numeralDecimalScale: currencyExponent(code)
      }}
      onChange={e => update(code, e.target.rawValue)}
    />
  </Input>
)

export default CurrencyInput
