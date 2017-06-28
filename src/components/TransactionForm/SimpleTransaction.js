import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'semantic-ui-react'
import Account from './Account'
import Tags from './Tags'
import { DropdownOption } from '../types'
import './index.css'

class SimpleTransaction extends React.Component {
  componentDidMount() {
    this.props.loadTagsOptions()
  }

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
        <div className="transaction-form-grid">
          <div className="transaction-form-grid__column-wide">
            <div className="transaction-form-grid__field">
              <Form.Field>
                <label>Tags</label>
                <Tags
                  value={this.props.tags}
                  options={this.props.tagsOptions}
                  onChange={this.handle(this.props.changeTags)}
                  onAddItem={this.handle(this.props.addTag)}
                />
              </Form.Field>
            </div>
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

SimpleTransaction.propTypes = {
  label: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  accountId: PropTypes.string,
  accountOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencyOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagsOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  changeAccount: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  changeTags: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  changeNote: PropTypes.func.isRequired,
  loadTagsOptions: PropTypes.func.isRequired,
  saveTransaction: PropTypes.func.isRequired
}

export default SimpleTransaction
