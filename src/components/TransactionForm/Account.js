import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form, Input } from 'semantic-ui-react'

const Account = props => (
  <Form.Group>
    <Form.Field width={11} className="mobile-with-margin">
      <label>
        {props.label}
      </label>
      <Dropdown
        selection
        options={props.accounts}
        value={props.accountId}
        onChange={props.onAccountChange}
      />
    </Form.Field>
    <Form.Field width={5} className="mobile-with-margin input-right">
      <label>Amount</label>
      <Input
        required
        type="number"
        value={props.amount}
        onChange={props.onAmountChange}
        labelPosition="right"
        label={
          props.currencies.length === 1
            ? props.currencies[0].text
            : <Dropdown
                options={props.currencies}
                value={props.currency}
                onChange={props.onCurrencyChange}
              />
        }
      />
    </Form.Field>
  </Form.Group>
)

const dropdownOption = PropTypes.shape({
  key: PropTypes.string,
  value: PropTypes.string,
  text: PropTypes.string
})
Account.propTypes = {
  label: PropTypes.string,
  accountId: PropTypes.string,
  accounts: PropTypes.arrayOf(dropdownOption),
  amount: PropTypes.string,
  currency: PropTypes.string,
  currencies: PropTypes.arrayOf(dropdownOption),
  onAccountChange: PropTypes.func,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func
}

export default Account
