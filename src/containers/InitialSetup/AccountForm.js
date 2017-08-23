import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import CurrencyTable from './CurrencyTable'
import Account from '../../models/Account'
import { changeName, changeGroup } from '../../actions/ui/accountForm'
import { saveAccount } from '../../actions/accounts'

class AccountForm extends React.Component {
  constructor(props) {
    super(props)

    this.groups = Account.groupAsDropdownOptions()
  }

  handleNameChange = (event, { value }) => this.props.changeName(value)
  handleGroupChange = (event, { value }) => this.props.changeGroup(value)

  handleSubmit = event => {
    event.preventDefault()
    this.props.saveAccount(Account.fromForm(this.props))
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginBottom: '1em' }}>
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
        <Form.Button content="Create Account" />
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
  saveAccount: PropTypes.func
}

const mapStateToProps = state => ({
  name: state.ui.accountForm.name,
  group: state.ui.accountForm.group,
  balance: state.ui.accountForm.balance
})

export default connect(mapStateToProps, {
  changeName,
  changeGroup,
  saveAccount
})(AccountForm)
