import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'semantic-ui-react'
import Account from './Account'
import { DropdownOption } from '../types'
import './index.css'

class TransferTransaction extends React.Component {
  handle = handler => (event, { value }) => handler(value)
  handleSubmit = event => {
    event.preventDefault()
    this.props.saveTransaction({
      accountId: this.props.accountId,
      amount: this.props.amount,
      currency: this.props.currency,
      tags: this.props.tags,
      date: this.props.date,
      note: this.props.note
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Account
          label="From"
          accountId={this.props.accountId}
          accountOptions={this.props.accountOptions}
          amount={this.props.amount}
          currency={this.props.currency}
          currencyOptions={this.props.currencyOptions}
          onAccountChange={this.handle(this.props.changeAccount)}
          onAmountChange={this.handle(this.props.changeAmount)}
          onCurrencyChange={this.handle(this.props.changeCurrency)}
        />
        <Account
          label="To"
          accountId={this.props.linkedAccountId}
          accountOptions={this.props.accountOptions}
          amount={this.props.linkedAmount}
          currency={this.props.linkedCurrency}
          currencyOptions={this.props.linkedCurrencyOptions}
          onAccountChange={this.handle(this.props.changeLinkedAccount)}
          onAmountChange={this.handle(this.props.changeLinkedAmount)}
          onCurrencyChange={this.handle(this.props.changeLinkedCurrency)}
        />
        <div className="transaction-form-grid single-line">
          <div className="transaction-form-grid__column-wide">
            <div className="transaction-form-grid__field">
              <Form.Field>
                <Input
                  placeholder="Note"
                  value={this.props.note}
                  onChange={this.handle(this.props.changeNote)}
                />
              </Form.Field>
            </div>
          </div>
          <div className="transaction-form-grid__column-narrow">
            <div className="transaction-form-grid__field">
              <Input
                required
                fluid
                type="date"
                value={this.props.date}
                onChange={this.handle(this.props.changeDate)}
              />
            </div>
            <div className="transaction-form-grid__field">
              <Button primary fluid>{this.props.buttonLabel}</Button>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

TransferTransaction.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  accountOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  accountId: PropTypes.string,
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencyOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  linkedAccountId: PropTypes.string,
  linkedAmount: PropTypes.string.isRequired,
  linkedCurrency: PropTypes.string.isRequired,
  linkedCurrencyOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  changeAccount: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  changeLinkedAccount: PropTypes.func,
  changeLinkedAmount: PropTypes.func,
  changeLinkedCurrency: PropTypes.func,
  changeDate: PropTypes.func.isRequired,
  changeNote: PropTypes.func.isRequired,
  saveTransaction: PropTypes.func.isRequired
}

export default TransferTransaction
