import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import Account from './Account'
import Footer from './Footer'
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
        {this.props.linkedAccountId !== undefined &&
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
          />}
        <Footer
          buttonLabel={this.props.buttonLabel}
          tags={this.props.tags}
          tagsOptions={this.props.tagsOptions}
          note={this.props.note}
          date={this.props.date}
          onTagsChange={this.handle(this.props.changeTags)}
          onAddTag={this.handle(this.props.addTag)}
          onNoteChange={this.handle(this.props.changeNote)}
          onDateChange={this.handle(this.props.changeDate)}
        />
      </Form>
    )
  }

  componentDidMount() {
    if (this.props.loadTagsOptions) this.props.loadTagsOptions()
  }

  handle = handler => (event, { value }) => handler(value)
  handleSubmit = event => {
    event.preventDefault()
    this.props.saveTransaction(this.props)
  }
}

TransactionForm.propTypes = {
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
  loadTagsOptions: PropTypes.func.isRequired,
  saveTransaction: PropTypes.func.isRequired
}

export default TransactionForm
