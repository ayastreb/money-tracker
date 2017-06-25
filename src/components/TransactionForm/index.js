import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Form, Grid, Input, Segment } from 'semantic-ui-react'
import Tabs from './Tabs'
import Account from './Account'
import {
  TRANSACTION_KINDS,
  INCOME_TRANSACTION,
  TRANSFER_TRANSACTION
} from '../../constants/transaction'
import './index.css'

class TransactionForm extends React.Component {
  handle = handler => (event, { value }) => handler(value)
  handleSubmit = event => {
    event.preventDefault()
    this.props.createTransaction({
      accountId: this.props.accountId,
      amount: this.props.kind === INCOME_TRANSACTION
        ? this.props.amount
        : -1 * this.props.amount,
      currency: this.props.currency,
      tags: this.props.tags,
      date: this.props.date,
      note: this.props.note
    })
    // TODO: handle transfer transactions
  }

  render() {
    return (
      <div className="transaction-form">
        <div className="transaction-form__header">
          <h3>Add Transaction</h3>
        </div>
        <Tabs
          kind={this.props.kind}
          changeTransactionKind={this.props.changeTransactionKind}
        />
        <Segment attached="bottom">
          <Form onSubmit={this.handleSubmit}>
            <Account
              label={this.props.kind === INCOME_TRANSACTION ? 'To' : 'From'}
              accountId={this.props.accountId}
              accounts={this.props.accounts}
              amount={this.props.amount}
              currency={this.props.currency}
              currencies={this.props.currencies}
              onAccountChange={this.handle(this.props.changeAccount)}
              onAmountChange={this.handle(this.props.changeAmount)}
              onCurrencyChange={this.handle(this.props.changeCurrency)}
            />
            {this.props.kind === TRANSFER_TRANSACTION &&
              <Account
                label="To"
                accountId={this.props.linkedAccountId}
                accounts={this.props.accounts}
                amount={this.props.linkedAmount}
                currency={this.props.linkedCurrency}
                currencies={this.props.linkedCurrencies}
                onAccountChange={this.handle(this.props.changeLinkedAccount)}
                onAmountChange={this.handle(this.props.changeLinkedAmount)}
                onCurrencyChange={this.handle(this.props.changeLinkedCurrency)}
              />}
            {this.props.isMobile ? this.tagsMobile() : this.tagsDesktop()}
            {this.props.isMobile ? this.submitMobile() : this.submitDesktop()}
          </Form>
        </Segment>
      </div>
    )
  }

  tagsDesktop() {
    return (
      <Form.Group>
        {this.props.kind === TRANSFER_TRANSACTION
          ? <Form.Field width={11}>
              {this.noteInput()}
            </Form.Field>
          : <Form.Field width={11}>
              <label>Tags</label>
              {this.tagsDropdown()}
            </Form.Field>}
        <Form.Field width={5}>
          {this.props.kind !== TRANSFER_TRANSACTION && <label>Date</label>}
          {this.dateInput()}
        </Form.Field>
      </Form.Group>
    )
  }

  submitDesktop() {
    return (
      <Form.Group>
        <Form.Field width={11}>
          {this.props.kind !== TRANSFER_TRANSACTION && this.noteInput()}
        </Form.Field>
        <Form.Field width={5}>
          {this.submitButton()}
        </Form.Field>
      </Form.Group>
    )
  }

  tagsMobile() {
    return (
      <Form.Group>
        {this.props.kind !== TRANSFER_TRANSACTION &&
          <Form.Field width={16} className="mobile-with-margin">
            <label>Tags</label>
            {this.tagsDropdown()}
          </Form.Field>}
        <Form.Field width={16} className="mobile-with-margin">
          {this.noteInput()}
        </Form.Field>
      </Form.Group>
    )
  }

  submitMobile() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={7}>
            {this.dateInput()}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={8}>
            {this.submitButton()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  tagsDropdown() {
    return (
      <Dropdown
        multiple
        selection
        search
        allowAdditions
        closeOnChange
        placeholder="Choose existing or add new tags"
        value={this.props.tags}
        options={this.props.tagOptions}
        onChange={this.handle(this.props.changeTags)}
        onAddItem={this.handle(this.props.addTag)}
      />
    )
  }

  dateInput() {
    return (
      <Input
        required
        fluid
        type="date"
        value={this.props.date}
        onChange={this.handle(this.props.changeDate)}
      />
    )
  }

  noteInput() {
    return (
      <Input
        placeholder="Note"
        value={this.props.note}
        onChange={this.handle(this.props.changeNote)}
      />
    )
  }

  submitButton() {
    return (
      <Button primary fluid>
        Add {this.props.kind}
      </Button>
    )
  }
}

const dropdownOption = PropTypes.shape({
  key: PropTypes.string,
  value: PropTypes.string,
  text: PropTypes.string
})
TransactionForm.propTypes = {
  isMobile: PropTypes.bool,
  kind: PropTypes.oneOf(TRANSACTION_KINDS).isRequired,
  accountId: PropTypes.string,
  accounts: PropTypes.arrayOf(dropdownOption),
  amount: PropTypes.string,
  currency: PropTypes.string,
  currencies: PropTypes.arrayOf(dropdownOption),
  linkedAccountId: PropTypes.string,
  linkedAmount: PropTypes.string,
  linkedCurrency: PropTypes.string,
  linkedCurrencies: PropTypes.arrayOf(dropdownOption),
  tagOptions: PropTypes.arrayOf(dropdownOption),
  tags: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string,
  note: PropTypes.string,
  changeTransactionKind: PropTypes.func,
  changeAccount: PropTypes.func,
  changeAmount: PropTypes.func,
  changeCurrency: PropTypes.func,
  changeLinkedAccount: PropTypes.func,
  changeLinkedAmount: PropTypes.func,
  changeLinkedCurrency: PropTypes.func,
  addTag: PropTypes.func,
  changeTags: PropTypes.func,
  changeDate: PropTypes.func,
  changeNote: PropTypes.func,
  createTransaction: PropTypes.func
}

export default TransactionForm
