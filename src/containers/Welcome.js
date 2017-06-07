import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Card, Container, Divider, Header } from 'semantic-ui-react'
import CurrencyForm from './CurrencyForm'
import AccountForm from './AccountForm'
import AccountList from './AccountList'
import { completeSetup } from '../actions/settings'

class Welcome extends React.Component {
  handleFinish = () => {
    this.props.completeSetup()
  }

  render() {
    return (
      <Container text>
        <Card raised fluid>
          <Card.Content>
            <Header as="h3">Setup Currencies</Header>
            <CurrencyForm />
            <Header as="h3">Create Accounts</Header>
            <AccountForm />
            <Divider clearing hidden />
            <AccountList />
            {this.props.accounts.length > 0
              ? <Button
                  primary
                  floated="right"
                  content="Finish"
                  onClick={this.handleFinish}
                />
              : ''}
          </Card.Content>
        </Card>
      </Container>
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
