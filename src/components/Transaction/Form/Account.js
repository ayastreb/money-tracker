import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Input } from 'semantic-ui-react';
import { DropdownOption } from '../../types';
import Currency from '../../../entities/Currency';

const Account = props => (
  <Form.Group>
    <Form.Field width={11} className="mobile-with-margin">
      <label>{props.label}</label>
      <Dropdown
        selection
        options={props.accountOptions}
        value={props.accountId}
        onChange={props.onAccountChange}
      />
    </Form.Field>
    <Form.Field width={5} className="mobile-with-margin input-right no-label">
      <Input
        required
        type="number"
        min={Currency.minAmount(props.currency)}
        step={Currency.minAmount(props.currency)}
        value={props.amount}
        onChange={props.onAmountChange}
        labelPosition="right"
        label={
          props.currencyOptions.length === 1 ? (
            props.currencyOptions[0].text
          ) : (
            <Dropdown
              options={props.currencyOptions}
              value={props.currency}
              onChange={props.onCurrencyChange}
            />
          )
        }
      />
    </Form.Field>
  </Form.Group>
);

Account.propTypes = {
  label: PropTypes.string,
  accountId: PropTypes.string,
  accountOptions: PropTypes.arrayOf(DropdownOption),
  amount: PropTypes.string,
  currency: PropTypes.string,
  currencyOptions: PropTypes.arrayOf(DropdownOption),
  onAccountChange: PropTypes.func,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func
};

export default Account;
