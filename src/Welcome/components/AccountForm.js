import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import CurrencyTable from './AccountForm/CurrencyTable'
import { accountTypesAsDropdownOptions } from '../constants/account'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.types = accountTypesAsDropdownOptions()
    this.initialState = {
      accountName: '',
      accountType: this.types[0].key,
      balance: {
        [props.currencies[0]]: ''
      }
    }
    this.state = this.initialState
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onUsedCurrencyChange = (e, { checked, value }) => {
    this.setState(prevState => {
      const prevBalance = prevState.balance
      if (!checked) {
        // Prevent switching off the last active checkbox
        let activeBoxes = Object.keys(prevBalance).reduce((active, code) => {
          return prevBalance[code] !== undefined ? ++active : active
        }, 0)
        if (activeBoxes === 1) return
      }

      return {
        balance: { ...prevBalance, [value]: checked ? '' : undefined }
      }
    })
  }

  updateBalance = (code, value) => {
    this.setState(prevState => ({
      balance: { ...prevState.balance, [code]: value }
    }))
  }

  onAccountFormSubmit = e => {
    e.preventDefault()
    this.props.createAccount(this.state)
    this.setState(this.initialState)
  }

  render() {
    return (
      <Form onSubmit={this.onAccountFormSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            required
            name="accountName"
            placeholder="Account name"
            value={this.state.accountName}
            onChange={this.handleChange}
          />
          <Form.Select
            label="Type"
            name="accountType"
            placeholder="Account type"
            options={this.types}
            value={this.state.accountType}
            onChange={this.handleChange}
          />
        </Form.Group>
        <CurrencyTable
          currencies={this.props.currencies}
          balance={this.state.balance}
          onChecked={this.onUsedCurrencyChange}
          updateBalance={this.updateBalance}
        />
        <Form.Button content="Create Account" floated="right" />
      </Form>
    )
  }
}

export default AccountForm
