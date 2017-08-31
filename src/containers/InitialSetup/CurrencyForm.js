import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dropdown, Form } from 'semantic-ui-react'
import { changeSettingsCurrency } from '../../actions/settings'
import { currencyAsDropdownOptions } from '../../constants/currency'
import { getBaseCurrency, getSecondaryCurrency } from '../../selectors/currency'

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
    this.props.changeSettingsCurrency({
      base: value,
      secondary: this.props.secondary
    })
  }

  handleSecondaryChange = (event, { value }) => {
    this.props.changeSettingsCurrency({
      base: this.props.base,
      secondary: value
    })
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
  exchangeRate: PropTypes.objectOf(PropTypes.number),
  changeSettingsCurrency: PropTypes.func
}

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  secondary: getSecondaryCurrency(state)
})

export default connect(mapStateToProps, { changeSettingsCurrency })(
  CurrencyForm
)
