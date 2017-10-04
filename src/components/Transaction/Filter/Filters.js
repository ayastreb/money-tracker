import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react'
import { DropdownOption } from '../../types'

class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: this.props.appliedAccounts
    }
  }

  handleAccountChange = (event, { value }) => this.setState({ accounts: value })

  handleResetClick = () => {
    this.setState({
      accounts: []
    })
  }

  handleApplyClick = () => {
    this.props.applyFilters(this.state)
    this.props.toggleFilterModal()
  }

  render() {
    return (
      <Modal
        open={this.props.isFilterModalOpen}
        onClose={this.props.toggleFilterModal}
        closeIcon
        size="tiny"
      >
        <Modal.Header>Filter transactions</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Account</label>
                <Dropdown
                  multiple
                  selection
                  closeOnChange
                  onChange={this.handleAccountChange}
                  options={this.props.accountOptions}
                  value={this.state.accounts}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Reset" onClick={this.handleResetClick} />
          <Button content="Apply" onClick={this.handleApplyClick} positive />
        </Modal.Actions>
      </Modal>
    )
  }
}

Filters.propTypes = {
  isFilterModalOpen: PropTypes.bool,
  appliedAccounts: PropTypes.arrayOf(PropTypes.string),
  accountOptions: PropTypes.arrayOf(DropdownOption),
  toggleFilterModal: PropTypes.func,
  applyFilters: PropTypes.func
}

export default Filters
