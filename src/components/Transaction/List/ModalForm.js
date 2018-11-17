import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Header } from 'semantic-ui-react';

const ModalForm = props => (
  <Modal
    closeIcon
    size="small"
    className="transaction"
    open={props.isOpen}
    onClose={props.resetTransactionForm}
  >
    <Header
      icon="file text outline"
      content={props.isEdit ? 'Edit Transaction' : 'New Transaction'}
    />
    <Modal.Content>
      <props.EditForm />
    </Modal.Content>
    {props.isEdit && (
      <Modal.Actions>
        <Button
          negative
          icon="trash"
          content="Delete"
          labelPosition="right"
          onClick={() => props.removeTransaction(props.currentTransactionId)}
        />
      </Modal.Actions>
    )}
  </Modal>
);

ModalForm.propTypes = {
  currentTransactionId: PropTypes.string,
  isOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  resetTransactionForm: PropTypes.func,
  removeTransaction: PropTypes.func,
  EditForm: PropTypes.func
};

export default ModalForm;
