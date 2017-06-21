import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form, Input } from 'semantic-ui-react'

const Account = props => (
  <Form.Group>
    <Form.Field width={11} className="mobile-with-margin">
      <label>
        {props.label}
      </label>
      <Dropdown selection options={props.accounts} value={props.accountId} />
    </Form.Field>
    <Form.Field width={5} className="mobile-with-margin">
      <label>Amount</label>
      <Input
        required
        type="number"
        value={props.amount}
        labelPosition="right"
        label={<Dropdown value={props.currency} options={props.currencies} />}
      />
    </Form.Field>
  </Form.Group>
)

Account.propTypes = {
  label: PropTypes.string,
  accountId: PropTypes.string,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string
    })
  ),
  amount: PropTypes.number,
  currency: PropTypes.string,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string
    })
  )
}

export default Account
