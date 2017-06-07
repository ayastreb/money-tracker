import React from 'react'
import Cleave from 'cleave.js/react'
import { Input, Label } from 'semantic-ui-react'
import { CURRENCY } from '../constants/currency'

const CurrencyInput = ({ value, code, onChange }) => (
  <Input labelPosition="left" fluid>
    <Label className="mono">
      {code}
    </Label>
    <Cleave
      name={code}
      value={value || ''}
      options={{
        numeral: true,
        numeralDecimalScale: CURRENCY[code].exp
      }}
      onChange={onChange}
      autoComplete={false}
    />
  </Input>
)

export default CurrencyInput
