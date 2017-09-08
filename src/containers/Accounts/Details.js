import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AccountForm from './Form'
import { loadAccounts } from '../../actions/entities/accounts'
import {
  fillInAccountForm,
  resetAccountForm
} from '../../actions/ui/form/account'
import { getAccount } from '../../selectors/entities/accounts'

class Details extends React.Component {
  initialState = null

  componentWillMount() {
    this.props.loadAccounts()
  }

  componentWillReceiveProps(props) {
    if (props.account.id && !this.initialState) {
      this.initialState = props.account
      this.props.fillInAccountForm(this.initialState)
    }
  }

  componentWillUnmount() {
    this.props.resetAccountForm()
  }

  render() {
    if (this.props.isComplete) return <Redirect to="/accounts" />

    return (
      <div className="container-full-page" style={{ padding: '1em' }}>
        <AccountForm />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  account: getAccount(ownProps.match.params.id)(state),
  isComplete: state.ui.form.account.completed
})

export default connect(mapStateToProps, {
  loadAccounts,
  fillInAccountForm,
  resetAccountForm
})(Details)
