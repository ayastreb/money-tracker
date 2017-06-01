import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import AccountForm from '../components/AccountForm'
import { createAccount } from '../actions/accounts'

const mapStateToProps = state => ({
  currencies: [state.currency.base, ...state.currency.secondary],
  accounts: state.accounts
})

const mapDispatchToProps = dispatch => ({
  createAccount: data => dispatch(createAccount(data))
})

const AccountStep = ({ currencies, createAccount, accounts }) => (
  <div>
    <Header as="h3">Create Accounts</Header>
    <AccountForm currencies={currencies} createAccount={createAccount} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(AccountStep)
