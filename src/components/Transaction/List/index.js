import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import TransactionItem from './TransactionItem';
import ModalForm from './ModalForm';
import './index.css';

class TransactionList extends React.Component {
  render() {
    return (
      <Segment className="transactions-list__wrapper">
        <Dimmer inverted active={this.props.isLoading}>
          <Loader active inline="centered" />
        </Dimmer>
        {this.props.transactions.length > 0 ? (
          this.props.transactions.map(this.renderTransaction)
        ) : (
          <div className="transactions-list__empty">No transactions found.</div>
        )}
        <ModalForm
          currentTransactionId={this.props.currentTransactionId}
          EditForm={this.props.EditForm}
          isOpen={this.props.isModalOpen}
          isEdit={this.props.isEdit}
          resetTransactionForm={this.props.resetTransactionForm}
          removeTransaction={this.props.removeTransaction}
        />
      </Segment>
    );
  }

  renderTransaction = transaction => (
    <TransactionItem
      key={transaction.id}
      transaction={transaction}
      openTransactionInModal={this.props.openTransactionInModal}
    />
  );
}

TransactionList.propTypes = {
  isLoading: PropTypes.bool,
  transactions: PropTypes.arrayOf(PropTypes.object),
  currentTransactionId: PropTypes.string,
  isModalOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  openTransactionInModal: PropTypes.func,
  resetTransactionForm: PropTypes.func,
  removeTransaction: PropTypes.func,
  EditForm: PropTypes.func
};

export default TransactionList;
