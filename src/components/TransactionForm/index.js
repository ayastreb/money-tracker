import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Input,
  Segment
} from 'semantic-ui-react'
import Tabs from './Tabs'
import Account from './Account'
import {
  TRANSACTION_KINDS,
  INCOME_TRANSACTION,
  TRANSFER_TRANSACTION
} from '../../constants/transaction'
import './style.css'

class TransactionForm extends React.Component {
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
          <Form>
            <Account
              label={this.props.kind === INCOME_TRANSACTION ? 'To' : 'From'}
              accountId={this.props.accountId}
              accounts={this.props.accounts}
              amount={this.props.amount}
              currency={this.props.currency}
              currencies={this.props.currencies}
            />
            {this.props.kind === TRANSFER_TRANSACTION &&
              <Account
                label="To"
                accountId={this.props.accountId}
                accounts={this.props.accounts}
                amount={this.props.amount}
                currency={this.props.currency}
                currencies={this.props.currencies}
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
        <Form.Field width={11}>
          <label>Tags</label>
          {this.tagsDropdown()}
        </Form.Field>
        <Form.Field width={5}>
          <label>Date</label>
          {this.dateInput()}
        </Form.Field>
      </Form.Group>
    )
  }

  submitDesktop() {
    return (
      <Form.Group>
        <Form.Field width={11}>
          {this.noteInput()}
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
        <Form.Field width={16} className="mobile-with-margin">
          <label>Tags</label>
          {this.tagsDropdown()}
        </Form.Field>
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
    return <Dropdown multiple selection search allowAdditions options={[]} />
  }

  dateInput() {
    return <Input fluid type="date" />
  }

  noteInput() {
    return <Input placeholder="Note" />
  }

  submitButton() {
    return <Button primary fluid content="Create" />
  }
}

TransactionForm.propTypes = {
  isMobile: PropTypes.bool,
  kind: PropTypes.oneOf(TRANSACTION_KINDS).isRequired,
  accountId: PropTypes.string,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string
    })
  ),
  amount: PropTypes.number,
  currency: PropTypes.string,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string
    })
  ),
  changeTransactionKind: PropTypes.func
}

export default TransactionForm
