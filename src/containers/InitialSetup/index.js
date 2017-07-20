import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import CurrencyForm from './CurrencyForm'
import AccountForm from './AccountForm'
import AccountTable from './AccountTable'
import { completeSetup } from '../../actions/settings'

class InitialSetup extends React.Component {
  handleFinish = () => this.props.completeSetup()

  render() {
    return (
      <div className="container-raised-desktop" style={{ paddingBottom: '0' }}>
        <Header as="h2" icon="settings" content="Money Tracker Setup" />
        <Divider />
        {!this.props.isAuthenticated &&
          <p>
            <Link to="/auth">Sign in</Link> if you want to sync your data
            with the cloud.
            You may also use the tracker without signing in.
            Your data will be stored only on current device in this case.
            You can sign in and sync your data any time later.
          </p>}
        <Header as="h3">Currencies</Header>
        <p>
          Select your base currency — the currency which will be used by default.
          <br />
          You can also select any number of additional currencies, if you use them.
        </p>
        <CurrencyForm />
        <Header as="h3">Accounts</Header>
        <p>
          Create accounts that you would like to keep track of.<br />
          It could be cash in your wallet, bank accounts, credit cards or
          even a loan to your friend.
        </p>
        <AccountForm />
        {this.props.accounts.length > 0 &&
          <div>
            <AccountTable />
            <div className="form-submit">
              <Button primary content="Finish" onClick={this.handleFinish} />
            </div>
          </div>}
      </div>
    )
  }
}

InitialSetup.propTypes = {
  isAuthenticated: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.string),
  completeSetup: PropTypes.func
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  accounts: state.accounts.allIds
})

export default connect(mapStateToProps, { completeSetup })(InitialSetup)
