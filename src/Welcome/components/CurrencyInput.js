import React from 'react'

import { CURRENCY } from '../constants'
import { Input, Label } from 'semantic-ui-react'
import Cleave from 'cleave.js/react'

const CurrencyInput = ({ value, code, update }) => (
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
      onChange={e => update(code, e.target.rawValue)}
    />
  </Input>
)

export default CurrencyInput
