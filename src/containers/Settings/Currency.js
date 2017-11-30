import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dropdown, Button, Form, Table } from 'semantic-ui-react'
import { changeSettingsCurrency } from '../../actions/settings'
import {
  getBaseCurrency,
  getSecondaryCurrency,
  getExchangeRate
} from '../../selectors/settings'
import Currency from '../../entities/Currency'

class CurrencySettings extends React.Component {
  constructor(props) {
    super(props)

    this.options = Currency.options()
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

  updateExchangeRate = () => {
    this.props.changeSettingsCurrency({
      base: this.props.base,
      secondary: this.props.secondary
    })
  }

  render() {
    return (
      <div style={{ maxWidth: '680px' }}>
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
        {this.props.secondary.length > 0 && this.renderExchangeRate()}
      </div>
    )
  }

  renderExchangeRate() {
    return (
      <div>
        <Table unstackable basic>
          <Table.Body>
            {this.props.secondary.map(code => (
              <Table.Row key={code}>
                <Table.Cell>{code}</Table.Cell>
                <Table.Cell textAlign="right" width={1}>
                  {Number(this.props.exchangeRate[code]).toFixed(4)}
                </Table.Cell>
                <Table.Cell textAlign="right" width={1}>
                  {Number(1 / this.props.exchangeRate[code]).toFixed(4)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button
          basic
          content="Update exchange rate"
          icon="refresh"
          onClick={this.updateExchangeRate}
        />
      </div>
    )
  }
}

CurrencySettings.propTypes = {
  base: PropTypes.string,
  secondary: PropTypes.arrayOf(PropTypes.string),
  exchangeRate: PropTypes.objectOf(PropTypes.number),
  changeSettingsCurrency: PropTypes.func
}

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  secondary: getSecondaryCurrency(state),
  exchangeRate: getExchangeRate(state)
})

export default connect(mapStateToProps, { changeSettingsCurrency })(
  CurrencySettings
)
