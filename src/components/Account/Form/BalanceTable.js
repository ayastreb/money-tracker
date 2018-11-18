import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input, Form } from 'semantic-ui-react';
import Amount from '../../../components/Amount';
import Currency from '../../../entities/Currency';

class BalanceTable extends React.Component {
  componentWillMount() {
    this.updateCurrencyList(this.props.base, this.props.secondary);
    this.setInitialCurrencyCheckbox(this.props.base);
  }

  componentWillReceiveProps(nextProps) {
    this.updateCurrencyList(nextProps.base, nextProps.secondary);
    this.setInitialCurrencyCheckbox(nextProps.base);
  }

  updateCurrencyList(base, secondary) {
    this.currencies = [base, ...secondary];
  }

  setInitialCurrencyCheckbox(base) {
    if (this.props.form.currencies.length === 0) {
      this.props.toggleCurrency(base);
    }
  }

  handleCurrencyChange = (event, { value }) => {
    this.props.toggleCurrency(value);
  };

  handleBalanceChange = code => (event, { value }) => {
    this.props.changeBalance({ code, balance: value });
  };

  render() {
    return this.currencies.map(code => (
      <Form.Group
        unstackable
        key={code}
        style={{ marginBottom: '1em', marginTop: '1em' }}
      >
        <Form.Field className="checkbox" width={9}>
          <Checkbox
            value={code}
            label={Currency.name(code)}
            checked={this.props.form.currencies.includes(code)}
            onChange={this.handleCurrencyChange}
          />
        </Form.Field>
        <Form.Field className="input-right" width={7}>
          {this.props.form.id ? (
            <Amount
              code={code}
              value={Currency.numberToCents(
                this.props.form.balance[code] || 0,
                code
              )}
            />
          ) : (
            <Input
              fluid
              type="number"
              placeholder="Balance"
              labelPosition="right"
              label={code}
              step={Currency.minAmount(code)}
              value={this.props.form.balance[code] || ''}
              onChange={this.handleBalanceChange(code)}
            />
          )}
        </Form.Field>
      </Form.Group>
    ));
  }
}

BalanceTable.propTypes = {
  base: PropTypes.string.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.string),
  form: PropTypes.shape({
    id: PropTypes.string,
    balance: PropTypes.objectOf(PropTypes.string),
    currencies: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  toggleCurrency: PropTypes.func.isRequired,
  changeBalance: PropTypes.func.isRequired
};

export default BalanceTable;
