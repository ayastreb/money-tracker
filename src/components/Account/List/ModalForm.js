import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Header, Button, Popup } from 'semantic-ui-react'

const ModalForm = props => (
  <Modal
    closeIcon
    size="small"
    className="account-form"
    open={props.isModalOpen}
    onClose={props.resetAccountForm}
  >
    <Header
      icon="file text outline"
      content={props.isEdit ? 'Edit Account' : 'New Account'}
    />
    <Modal.Content>
      <props.EditForm />
    </Modal.Content>
    {props.isEdit && (
      <Modal.Actions>
        <Popup
          flowing
          on="click"
          header="All transactions will be deleted!"
          trigger={
            <Button
              negative
              content="Delete"
              icon="trash"
              labelPosition="right"
            />
          }
          content={
            <Button
              negative
              floated="right"
              content="Confirm"
              style={{ marginTop: '1em' }}
              onClick={() => props.removeAccount(props.form.id)}
            />
          }
        />
      </Modal.Actions>
    )}
  </Modal>
)

ModalForm.propTypes = {
  isModalOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  resetAccountForm: PropTypes.func,
  removeAccount: PropTypes.func,
  EditForm: PropTypes.func
}

export default ModalForm
