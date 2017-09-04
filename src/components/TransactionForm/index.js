import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Dropdown, Input } from 'semantic-ui-react'
import Account from './Account'
import Transaction, {
  EXPENSE,
  TRANSFER,
  INCOME
} from '../../entities/Transaction'
import { DropdownOption } from '../types'
import './index.css'

class TransactionForm extends React.Component {
  handleAccountChange = handler => (event, { value }) => {
    handler({
      accountId: value,
      currency: this.props.currencyMap[value]
    })
  }

  getCurrencyOptions = () => {
    return this.props.currencyMap[this.props.form.accountId].map(code => ({
      key: code,
      value: code,
      text: code
    }))
  }

  getLinkedCurrencyOptions = () => {
    return this.props.currencyMap[
      this.props.form.linkedAccountId
    ].map(code => ({
      key: code,
      value: code,
      text: code
    }))
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="transaction-form">
        <Account
          label={this.props.label}
          accountId={this.props.form.accountId}
          amount={this.props.form.amount}
          currency={this.props.form.currency}
          accountOptions={this.props.accountOptions}
          currencyOptions={this.getCurrencyOptions()}
          onAccountChange={this.handleAccountChange(this.props.changeAccount)}
          onAmountChange={this.handle(this.props.changeAmount)}
          onCurrencyChange={this.handle(this.props.changeCurrency)}
        />
        {this.props.form.kind === TRANSFER && (
          <Account
            label="To"
            accountId={this.props.form.linkedAccountId}
            amount={this.props.form.linkedAmount}
            currency={this.props.form.linkedCurrency}
            accountOptions={this.props.accountOptions}
            currencyOptions={this.getLinkedCurrencyOptions()}
            onAccountChange={this.handleAccountChange(
              this.props.changeLinkedAccount
            )}
            onAmountChange={this.handle(this.props.changeLinkedAmount)}
            onCurrencyChange={this.handle(this.props.changeLinkedCurrency)}
          />
        )}
        <div className={this.gridClassName()}>
          <div className="transaction-form-grid__column-wide">
            {this.props.form.tags[this.props.form.kind] !== undefined && (
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
                    value={this.props.form.tags[this.props.form.kind]}
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
                  value={this.props.form.note}
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
                  value={this.props.form.date}
                  onChange={this.handle(this.props.changeDate)}
                />
              </Form.Field>
            </div>
            <div className="transaction-form-grid__field">
              <Button
                primary
                fluid
                disabled={parseFloat(this.props.form.amount) === 0}
              >
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
    this.props.form.kind === TRANSFER
      ? 'transaction-form-grid single-line'
      : 'transaction-form-grid'
  handle = handler => (event, { value }) => handler(value)
  handleSubmit = event => {
    event.preventDefault()
    this.props.saveTransaction(Transaction.fromForm(this.props.form))
  }
}

TransactionForm.propTypes = {
  form: PropTypes.shape({
    kind: PropTypes.oneOf([EXPENSE, TRANSFER, INCOME]),
    accountId: PropTypes.string,
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    linkedAccountId: PropTypes.string,
    linkedAmount: PropTypes.string,
    linkedCurrency: PropTypes.string,
    tags: PropTypes.shape({
      [EXPENSE]: PropTypes.arrayOf(PropTypes.string),
      [INCOME]: PropTypes.arrayOf(PropTypes.string)
    }),
    date: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired
  }),
  label: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  currencyMap: PropTypes.object.isRequired,
  accountOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  tagsOptions: PropTypes.arrayOf(DropdownOption),
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
