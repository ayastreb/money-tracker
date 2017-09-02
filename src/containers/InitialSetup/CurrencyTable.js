import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox, Input, Form } from 'semantic-ui-react'
import {
  changeCurrencyCheckbox,
  changeCurrencyBalance
} from '../../actions/ui/accountForm'
import { getBaseCurrency, getSecondaryCurrency } from '../../selectors/currency'
import Currency from '../../entities/Currency'

class CurrencyTable extends React.Component {
  componentWillMount() {
    this.updateCurrencyList(this.props.base, this.props.secondary)
    this.setInitialBalanceCheckbox(this.props.base, this.props.balance)
  }

  componentWillReceiveProps(nextProps) {
    this.updateCurrencyList(nextProps.base, nextProps.secondary)
    this.setInitialBalanceCheckbox(nextProps.base, nextProps.balance)
  }

  updateCurrencyList(base, secondary) {
    this.currencies = [base, ...secondary]
  }

  setInitialBalanceCheckbox(base, balance) {
    if (Object.keys(balance).length === 0) {
      this.props.changeCurrencyCheckbox(base, true)
    }
  }

  handleCheckbox = (event, { value, checked }) => {
    this.props.changeCurrencyCheckbox(value, checked)
  }

  handleInput = code => (event, { value }) => {
    this.props.changeCurrencyBalance(code, value)
  }

  render() {
    return (
      <div>
        {this.currencies.map(code => {
          return (
            <Form.Group widths="equal" key={code}>
              <Form.Field style={{ paddingTop: '0.5em' }}>
                <Checkbox
                  checked={this.props.balance[code] !== undefined}
                  onChange={this.handleCheckbox}
                  value={code}
                  label={Currency.name(code)}
                />
              </Form.Field>
              <Form.Field className="input-right">
                <Input
                  labelPosition="right"
                  label={code}
                  type="number"
                  step="any"
                  autoComplete={false}
                  placeholder="Initial balance"
                  value={this.props.balance[code] || ''}
                  onChange={this.handleInput(code)}
                  fluid
                />
              </Form.Field>
            </Form.Group>
          )
        })}
      </div>
    )
  }
}

CurrencyTable.propTypes = {
  base: PropTypes.string,
  secondary: PropTypes.arrayOf(PropTypes.string),
  balance: PropTypes.objectOf(PropTypes.string),
  changeCurrencyCheckbox: PropTypes.func,
  changeCurrencyBalance: PropTypes.func
}

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  secondary: getSecondaryCurrency(state),
  balance: state.ui.accountForm.balance
})

export default connect(mapStateToProps, {
  changeCurrencyCheckbox,
  changeCurrencyBalance
})(CurrencyTable)
