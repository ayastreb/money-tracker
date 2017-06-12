import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Divider, Header } from 'semantic-ui-react'
import CurrencyForm from './CurrencyForm'
import AccountForm from './AccountForm'
import AccountTable from './AccountTable'
import { completeSetup } from '../actions/settings'

class Welcome extends React.Component {
  handleFinish = () => this.props.completeSetup()

  render() {
    return (
      <div className="container-raised-desktop">
        <Header as="h2">Welcome</Header>
        <p>
          To get started you need to setup your currencies and create accounts.
        </p>
        <Header as="h3">Setup Currencies</Header>
        <p>
          Select your base currency — the currency which will be used by default.
        </p>
        <p>
          You can also select any number of additional currencies, if you use them.
        </p>
        <CurrencyForm />
        <Header as="h3">Create Accounts</Header>
        <p>
          Create accounts that you would like to keep track of.
        </p>
        <p>
          It could be cash in your wallet, bank accounts, credit cards or even a loan to your friend.
        </p>
        <AccountForm />
        <Divider clearing hidden />
        <AccountTable />
        {this.props.accounts.length > 0
          ? <Button
              primary
              floated="right"
              content="Finish"
              onClick={this.handleFinish}
            />
          : ''}
        <Divider clearing hidden />
      </div>
    )
  }
}

Welcome.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.string),
  completeSetup: PropTypes.func
}

const mapStateToProps = state => ({
  accounts: state.accounts.allIds
})

export default connect(mapStateToProps, { completeSetup })(Welcome)
