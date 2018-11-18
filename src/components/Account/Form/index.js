import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';
import { getAccountGroupOptions, formTostate } from 'entities/Account';
import BalanceTable from './BalanceTable';
import './index.css';

class AccountForm extends React.Component {
  constructor(props) {
    super(props);

    this.groups = getAccountGroupOptions();
  }

  handleNameChange = (event, { value }) => this.props.changeName(value);
  handleGroupChange = (event, { value }) => this.props.changeGroup(value);

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveAccount(formTostate(this.props.form));
  };

  render() {
    return (
      <Form className="account-form" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            width={9}
            required
            label="Name"
            placeholder="Account name"
            value={this.props.form.name}
            onChange={this.handleNameChange}
          />
          <Form.Select
            width={7}
            label="Group"
            value={this.props.form.group}
            options={this.groups}
            onChange={this.handleGroupChange}
          />
        </Form.Group>
        <BalanceTable {...this.props} />
        <Form.Group unstackable>
          <Form.Field width={9} style={{ paddingTop: '0.5em' }}>
            <Checkbox
              label="Show on Dashboard"
              checked={this.props.form.on_dashboard}
              onChange={this.props.toggleOnDashboard}
            />
          </Form.Field>
          <Form.Button width={7} primary fluid content="Save Account" />
        </Form.Group>
      </Form>
    );
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
  saveAccount: PropTypes.func
};

export default AccountForm;
