import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Input, Form } from 'semantic-ui-react'
import Amount from '../../../components/Amount'
import Currency from '../../../entities/Currency'

class CurrencyTable extends React.Component {
  componentWillMount() {
    this.updateCurrencyList(this.props.base, this.props.secondary)
    this.setInitialCurrencyCheckbox(this.props.base)
  }

  componentWillReceiveProps(nextProps) {
    this.updateCurrencyList(nextProps.base, nextProps.secondary)
    this.setInitialCurrencyCheckbox(nextProps.base)
  }

  updateCurrencyList(base, secondary) {
    this.currencies = [base, ...secondary]
  }

  setInitialCurrencyCheckbox(base) {
    if (this.props.form.currencies.length === 0) {
      this.props.toggleCurrency(base)
    }
  }

  handleCurrencyChange = (event, { value }) => {
    this.props.toggleCurrency(value)
  }

  handleBalanceChange = code => (event, { value }) => {
    this.props.changeBalance({ code: code, balance: value })
  }

  render() {
    return (
      <div>
        {this.currencies.map(code => (
          <Form.Group widths="equal" key={code}>
            <Form.Field className="checkbox">
              <Checkbox
                checked={this.props.form.currencies.includes(code)}
                onChange={this.handleCurrencyChange}
                value={code}
                label={Currency.name(code)}
              />
            </Form.Field>
            <Form.Field className="input-right">
              {this.props.form.id ? (
                <Amount
                  code={code}
                  value={Currency.toInt(
                    this.props.form.balance[code] || 0,
                    code
                  )}
                />
              ) : (
                <Input
                  labelPosition="right"
                  label={code}
                  type="number"
                  step={Currency.minAmount(code)}
                  autoComplete={false}
                  placeholder="Initial balance"
                  value={this.props.form.balance[code] || ''}
                  onChange={this.handleBalanceChange(code)}
                  fluid
                />
              )}
            </Form.Field>
          </Form.Group>
        ))}
      </div>
    )
  }
}

CurrencyTable.propTypes = {
  base: PropTypes.string.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.string),
  form: PropTypes.shape({
    id: PropTypes.string,
    balance: PropTypes.objectOf(PropTypes.string),
    currencies: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  toggleCurrency: PropTypes.func.isRequired,
  changeBalance: PropTypes.func.isRequired
}

export default CurrencyTable
