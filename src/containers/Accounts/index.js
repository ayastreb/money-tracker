import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { loadAccounts, removeAccount } from '../../actions/entities/accounts'
import {
  openAccountInModal,
  resetAccountForm
} from '../../actions/ui/form/account'
import { getForm } from '../../selectors/ui/form/account'
import ModalForm from '../../components/Account/List/ModalForm'
import AccountsList from './List'
import AccountForm from './Form'

class Accounts extends React.Component {
  componentWillMount() {
    this.props.loadAccounts()
  }

  render() {
    return (
      <div className="container-full-page flat">
        <div className="container-header">
          <Button.Group basic>
            <Button
              icon="plus"
              labelPosition="left"
              content="New"
              onClick={this.props.openAccountInModal}
            />
          </Button.Group>
        </div>
        <div className="accounts-list-wrapper">
          <AccountsList />
        </div>
        <ModalForm {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  form: getForm(state),
  isModalOpen: getForm(state).isModalOpen,
  isEdit: getForm(state).id !== undefined,
  EditForm: AccountForm
})

export default connect(mapStateToProps, {
  loadAccounts,
  openAccountInModal,
  resetAccountForm,
  removeAccount
})(Accounts)
