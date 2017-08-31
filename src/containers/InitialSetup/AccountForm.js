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

    this.groups = Account.groupOptions()
  }

  handleNameChange = (event, { value }) => this.props.changeName(value)
  handleGroupChange = (event, { value }) => this.props.changeGroup(value)

  handleSubmit = event => {
    event.preventDefault()
    this.props.saveAccount(Account.fromForm(this.props.form))
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginBottom: '1em' }}>
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            required
            placeholder="Account name"
            value={this.props.form.name}
            onChange={this.handleNameChange}
          />
          <Form.Select
            label="Group"
            options={this.groups}
            value={this.props.form.group}
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
  form: PropTypes.shape({
    name: PropTypes.string,
    group: PropTypes.string,
    balance: PropTypes.objectOf(PropTypes.string)
  }),
  changeName: PropTypes.func,
  changeGroup: PropTypes.func,
  saveAccount: PropTypes.func
}

const mapStateToProps = state => ({
  form: state.ui.accountForm
})

export default connect(mapStateToProps, {
  changeName,
  changeGroup,
  saveAccount
})(AccountForm)
