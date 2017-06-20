import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dropdown, Form } from 'semantic-ui-react'
import { getUsedCurrency } from '../selectors/currency'
import { changeCurrency, updateExchangeRate } from '../actions/settings'
import { currencyAsDropdownOptions } from '../constants/currency'

class CurrencyForm extends React.Component {
  constructor(props) {
    super(props)

    this.options = currencyAsDropdownOptions()
    this.updateSecondaryOptions(props.base)
  }

  componentWillReceiveProps(props) {
    this.updateSecondaryOptions(props.base)
  }

  updateSecondaryOptions(base) {
    this.secondaryOptions = this.options.filter(option => option.key !== base)
  }

  handleBaseChange = (event, { value }) => {
    this.props.changeCurrency(value, this.props.secondary, this.props.base)
    this.props.updateExchangeRate(
      value,
      this.props.secondary,
      this.props.usedCurrency
    )
  }

  handleSecondaryChange = (event, { value }) => {
    this.props.changeCurrency(this.props.base, value)
    this.props.updateExchangeRate(
      this.props.base,
      value,
      this.props.usedCurrency
    )
  }

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Base Currency</label>
            <Dropdown
              search
              selection
              minCharacters={0}
              onChange={this.handleBaseChange}
              options={this.options}
              value={this.props.base}
            />
          </Form.Field>
          <Form.Field>
            <label>Additional Currencies (optional)</label>
            <Dropdown
              placeholder="Select additional currencies"
              search
              selection
              multiple
              renderLabel={item => item.key}
              minCharacters={0}
              closeOnChange
              onChange={this.handleSecondaryChange}
              options={this.secondaryOptions}
              value={this.props.secondary}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

CurrencyForm.propTypes = {
  base: PropTypes.string,
  secondary: PropTypes.arrayOf(PropTypes.string),
  usedCurrency: PropTypes.arrayOf(PropTypes.string),
  exchangeRate: PropTypes.objectOf(PropTypes.number),
  changeCurrency: PropTypes.func,
  updateExchangeRate: PropTypes.func
}

const mapStateToProps = state => ({
  base: state.settings.currency.base,
  secondary: state.settings.currency.secondary,
  usedCurrency: getUsedCurrency(state),
  exchangeRate: state.settings.exchangeRate
})

export default connect(mapStateToProps, { changeCurrency, updateExchangeRate })(
  CurrencyForm
)
