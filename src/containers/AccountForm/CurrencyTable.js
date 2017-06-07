import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox, Table } from 'semantic-ui-react'
import CurrencyInput from '../../components/CurrencyInput'
import { CURRENCY } from '../../constants/currency'
import {
  changeCurrencyCheckbox,
  changeCurrencyBalance
} from '../../actions/ui/accountForm'

class CurrencyTable extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.balance).length === 0) {
      this.props.changeCurrencyCheckbox(this.props.base, true)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.balance).length === 0) {
      this.props.changeCurrencyCheckbox(nextProps.base, true)
    }
  }

  handleCheckbox = (event, { value, checked }) => {
    this.props.changeCurrencyCheckbox(value, checked)
  }

  handleInput = code => event => {
    this.props.changeCurrencyBalance(code, event.target.rawValue)
  }

  render() {
    const currencies = [this.props.base, ...this.props.secondary]
    return (
      <Table basic="very" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ width: '50%' }}>
              Currency
            </Table.HeaderCell>
            <Table.HeaderCell>Initial Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currencies.map(code => {
            return (
              <Table.Row key={code}>
                <Table.Cell>
                  <Checkbox
                    checked={this.props.balance[code] !== undefined}
                    onChange={this.handleCheckbox}
                    value={code}
                    label={CURRENCY[code].name}
                  />
                </Table.Cell>
                <Table.Cell>
                  <CurrencyInput
                    value={this.props.balance[code]}
                    code={code}
                    onChange={this.handleInput(code)}
                  />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
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
  base: state.settings.currency.base,
  secondary: state.settings.currency.secondary,
  balance: state.ui.accountForm.balance
})

export default connect(mapStateToProps, {
  changeCurrencyCheckbox,
  changeCurrencyBalance
})(CurrencyTable)
