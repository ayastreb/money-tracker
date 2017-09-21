import React from 'react'
import PropTypes from 'prop-types'
import TransactionItem from './TransactionItem'
import ModalForm from './ModalForm'
import './index.css'

class TransactionList extends React.Component {
  render() {
    return (
      <div className="transactions-list__wrapper">
        {this.props.transactions.length > 0 ? (
          this.props.transactions.map(this.renderTransaction)
        ) : (
          <div className="transactions-list__empty">
            You don't have any transactions yet
          </div>
        )}
        <ModalForm
          EditForm={this.props.EditForm}
          isOpen={this.props.isModalOpen}
          resetTransactionForm={this.props.resetTransactionForm}
          removeTransaction={this.props.removeTransaction}
        />
      </div>
    )
  }

  renderTransaction = transaction => (
    <TransactionItem
      key={transaction.id}
      transaction={transaction}
      openTransactionInModal={this.props.openTransactionInModal}
    />
  )
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
  isModalOpen: PropTypes.bool,
  openTransactionInModal: PropTypes.func,
  resetTransactionForm: PropTypes.func,
  removeTransaction: PropTypes.func,
  EditForm: PropTypes.func
}

export default TransactionList
