import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import CurrencyTable from './AccountForm/CurrencyTable'
import { accountGroupAsDropdownOptions } from '../constants/account'
import { changeName, changeGroup } from '../actions/ui/accountForm'
import { createAccount } from '../actions/accounts'

class AccountForm extends React.Component {
  constructor(props) {
    super(props)

    this.groups = accountGroupAsDropdownOptions()
  }

  handleNameChange = (event, { value }) => this.props.changeName(value)
  handleGroupChange = (event, { value }) => this.props.changeGroup(value)

  handleSubmit = event => {
    event.preventDefault()
    this.props.createAccount(
      this.props.name,
      this.props.group,
      this.props.balance
    )
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            required
            placeholder="Account name"
            value={this.props.name}
            onChange={this.handleNameChange}
          />
          <Form.Select
            label="Group"
            options={this.groups}
            value={this.props.group}
            onChange={this.handleGroupChange}
          />
        </Form.Group>
        <CurrencyTable />
        <Form.Button content="Create Account" floated="right" />
      </Form>
    )
  }
}

AccountForm.propTypes = {
  name: PropTypes.string,
  group: PropTypes.string,
  balance: PropTypes.objectOf(PropTypes.string),
  changeName: PropTypes.func,
  changeGroup: PropTypes.func,
  createAccount: PropTypes.func
}

const mapStateToProps = state => ({
  name: state.ui.accountForm.name,
  group: state.ui.accountForm.group,
  balance: state.ui.accountForm.balance
})

export default connect(mapStateToProps, {
  changeName,
  changeGroup,
  createAccount
})(AccountForm)
