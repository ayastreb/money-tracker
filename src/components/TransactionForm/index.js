import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Dropdown, Input } from 'semantic-ui-react'
import Account from './Account'
import Transaction from '../../models/Transaction'
import { DropdownOption } from '../types'
import './index.css'

class TransactionForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Account
          label={this.props.label}
          accountId={this.props.accountId}
          accountOptions={this.props.accountOptions}
          amount={this.props.amount}
          currency={this.props.currency}
          currencyOptions={this.props.currencyOptions}
          onAccountChange={this.handle(this.props.changeAccount)}
          onAmountChange={this.handle(this.props.changeAmount)}
          onCurrencyChange={this.handle(this.props.changeCurrency)}
        />
        {this.props.linkedAccountId && (
          <Account
            label="To"
            accountId={this.props.linkedAccountId}
            accountOptions={this.props.accountOptions}
            amount={
              this.props.currency === this.props.linkedCurrency ? (
                this.props.amount
              ) : (
                this.props.linkedAmount
              )
            }
            currency={this.props.linkedCurrency}
            currencyOptions={this.props.linkedCurrencyOptions}
            onAccountChange={this.handle(this.props.changeLinkedAccount)}
            onAmountChange={this.handle(this.props.changeLinkedAmount)}
            onCurrencyChange={this.handle(this.props.changeLinkedCurrency)}
          />
        )}
        <div className={this.gridClassName()}>
          <div className="transaction-form-grid__column-wide">
            {this.props.tags !== undefined && (
              <div className="transaction-form-grid__field">
                <Form.Field>
                  <label>Tags</label>
                  <Dropdown
                    multiple
                    selection
                    search
                    allowAdditions
                    closeOnChange
                    placeholder="Choose existing tags or add new"
                    value={this.props.tags}
                    options={this.props.tagsOptions}
                    onChange={this.handle(this.props.changeTags)}
                    onAddItem={this.handle(this.props.addTag)}
                  />
                </Form.Field>
              </div>
            )}
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
              <Form.Field>
                <Input
                  required
                  fluid
                  type="date"
                  value={this.props.date}
                  onChange={this.handle(this.props.changeDate)}
                />
              </Form.Field>
            </div>
            <div className="transaction-form-grid__field">
              <Button primary fluid>
                {this.props.buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    )
  }

  componentDidMount() {
    if (this.props.loadTagsOptions) this.props.loadTagsOptions()
  }

  gridClassName = () =>
    this.props.tags === undefined
      ? 'transaction-form-grid single-line'
      : 'transaction-form-grid'
  handle = handler => (event, { value }) => handler(value)
  handleSubmit = event => {
    event.preventDefault()
    this.props.saveTransaction(Transaction.fromForm(this.props))
  }
}

TransactionForm.propTypes = {
  kind: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  accountId: PropTypes.string,
  accountOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencyOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  linkedAccountId: PropTypes.string,
  linkedAmount: PropTypes.string,
  linkedCurrency: PropTypes.string,
  linkedCurrencyOptions: PropTypes.arrayOf(DropdownOption),
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  changeAccount: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  changeLinkedAccount: PropTypes.func,
  changeLinkedAmount: PropTypes.func,
  changeLinkedCurrency: PropTypes.func,
  addTag: PropTypes.func,
  changeTags: PropTypes.func,
  changeDate: PropTypes.func.isRequired,
  changeNote: PropTypes.func.isRequired,
  loadTagsOptions: PropTypes.func,
  saveTransaction: PropTypes.func.isRequired
}

export default TransactionForm
