import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox, Popup, Button } from 'semantic-ui-react'
import CurrencyTable from './CurrencyTable'
import Account from '../../../entities/Account'
import './index.css'

class AccountForm extends React.Component {
  constructor(props) {
    super(props)

    this.groups = Account.groupOptions()
  }

  handleNameChange = (event, { value }) => this.props.changeName(value)
  handleGroupChange = (event, { value }) => this.props.changeGroup(value)
  toggleOnDashboard = event => this.props.toggleOnDashboard()

  handleSubmit = event => {
    event.preventDefault()
    this.props.saveAccount(Account.fromForm(this.props.form))
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="account-form">
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
        <CurrencyTable {...this.props} />
        <Form.Field style={{ paddingTop: '0.5em' }}>
          <Checkbox
            checked={this.props.form.on_dashboard}
            onChange={this.toggleOnDashboard}
            label="Display on Dashboard"
          />
        </Form.Field>
        <Form.Group unstackable className="no-margin" widths={2}>
          <Form.Button primary content="Save Account" />
          {this.props.form.id && (
            <Popup
              on="click"
              flowing
              trigger={
                <Form.Button
                  className="input-right"
                  content="Delete Account"
                  onClick={e => e.preventDefault()}
                />
              }
              header="All transactions will be deleted!"
              content={
                <Button
                  negative
                  floated="right"
                  style={{ marginTop: '1em' }}
                  content="Confirm"
                  onClick={() => this.props.removeAccount(this.props.form.id)}
                />
              }
            />
          )}
        </Form.Group>
      </Form>
    )
  }
}

AccountForm.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    group: PropTypes.string,
    balance: PropTypes.objectOf(PropTypes.string),
    currencies: PropTypes.arrayOf(PropTypes.string),
    on_dashboard: PropTypes.bool
  }),
  base: PropTypes.string.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.string),
  changeName: PropTypes.func,
  changeGroup: PropTypes.func,
  toggleOnDashboard: PropTypes.func,
  toggleCurrency: PropTypes.func.isRequired,
  changeBalance: PropTypes.func.isRequired,
  saveAccount: PropTypes.func,
  removeAccount: PropTypes.func
}

export default AccountForm
