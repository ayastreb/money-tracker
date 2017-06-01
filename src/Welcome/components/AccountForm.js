import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import CurrencyTable from './AccountForm/CurrencyTable'
import { accountTypesAsDropdownOptions } from '../../data/accountType'

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
      if (!checked) {
        /**
         * At least one checkbox should always be selected,
         * this will prevent user from switching off the last checked box.
         */
        let checkedBoxes = 0
        for (let code of Object.keys(prevState.balance)) {
          if (prevState.balance[code] !== undefined) checkedBoxes++
        }
        if (checkedBoxes === 1) return
      }

      return {
        balance: { ...prevState.balance, [value]: checked ? '' : undefined }
      }
    })
  }

  updateInitialBalance = (code, value) => {
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
          updateBalance={this.updateInitialBalance}
        />
        <Button primary content="Create Account" floated="right" />
      </Form>
    )
  }
}

export default AccountForm
