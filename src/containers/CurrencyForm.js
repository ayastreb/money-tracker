import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dropdown, Form } from 'semantic-ui-react'
import { changeCurrency } from '../actions/settings'
import { currencyAsDropdownOptions } from '../constants/currency'

class CurrencyForm extends React.Component {
  constructor(props) {
    super(props)

    this.options = currencyAsDropdownOptions()
  }

  handleBaseChange = (event, { value }) => {
    this.props.changeCurrency(value, this.props.secondary)
  }

  handleSecondaryChange = (event, { value }) => {
    this.props.changeCurrency(this.props.base, value)
  }

  render() {
    return (
      <Form>
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
            onChange={this.handleSecondaryChange}
            options={this.options.filter(
              option => option.key !== this.props.base
            )}
            value={this.props.secondary}
          />
        </Form.Field>
      </Form>
    )
  }
}

CurrencyForm.propTypes = {
  base: PropTypes.string,
  secondary: PropTypes.arrayOf(PropTypes.string),
  changeCurrency: PropTypes.func
}

const mapStateToProps = state => ({
  base: state.settings.currency.base,
  secondary: state.settings.currency.secondary
})

export default connect(mapStateToProps, { changeCurrency })(CurrencyForm)
