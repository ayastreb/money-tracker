import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Header } from 'semantic-ui-react'

class ModalForm extends React.Component {
  render() {
    return (
      <Modal
        size="small"
        className="transaction"
        closeIcon
        open={this.props.isOpen}
        onClose={this.props.resetTransactionForm}
      >
        <Header icon="exchange" content="Transaction Details" />
        <Modal.Content>
          <this.props.EditForm />
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            labelPosition="right"
            icon="trash"
            content="Delete"
            onClick={this.props.removeTransaction}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalForm.propTypes = {
  isOpen: PropTypes.bool,
  resetTransactionForm: PropTypes.func,
  removeTransaction: PropTypes.func,
  EditForm: PropTypes.func
}

export default ModalForm
