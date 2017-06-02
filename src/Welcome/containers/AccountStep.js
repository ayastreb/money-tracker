import React from 'react'
import { connect } from 'react-redux'
import { Button, Header, Divider } from 'semantic-ui-react'
import AccountForm from '../components/AccountForm'
import AccountList from '../components/AccountList'
import { createAccount, removeAccount } from '../actions'

const mapStateToProps = state => ({
  currencies: [state.currency.base, ...state.currency.secondary],
  accounts: state.accounts
})

const mapDispatchToProps = dispatch => ({
  createAccount: data => dispatch(createAccount(data)),
  removeAccount: id => dispatch(removeAccount(id))
})

const AccountStep = ({
  currencies,
  accounts,
  createAccount,
  removeAccount
}) => (
  <div>
    <Header as="h3">Create Accounts</Header>
    <AccountForm currencies={currencies} createAccount={createAccount} />
    {accounts.length > 0
      ? <div>
          <Divider clearing hidden />
          <AccountList accounts={accounts} removeAccount={removeAccount} />
          <Button primary floated="right" content="Finish" />
        </div>
      : ''}
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(AccountStep)
