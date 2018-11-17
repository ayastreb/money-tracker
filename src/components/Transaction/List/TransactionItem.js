import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Icon, Button, Label } from 'semantic-ui-react';
import Amount from '../../Amount';
import { stateToForm, TransationKindT } from '../../../entities/Transaction';
import { toLocalTimestamp } from '../../../util/timezone';

const { Expense, Transfer, Income } = TransationKindT;

class TransactionItem extends React.Component {
  handleEditClick = () => {
    this.props.openTransactionInModal(stateToForm(this.props.transaction));
  };

  render() {
    const { transaction } = this.props;
    return (
      <div className="transaction-item">
        <div className="transaction-item__date">
          {format(toLocalTimestamp(transaction.date), 'DD MMM')}
        </div>
        <div className="transaction-item__info">
          {transaction.accountName}
          {this.renderArrow()}
          {transaction.kind === Transfer && transaction.linkedAccountName}
          {transaction.tags &&
            transaction.tags.map(tag => <Label key={tag} content={tag} />)}
          <span className="transaction-item__info__note">
            {transaction.note}
          </span>
        </div>
        <div className="transaction-item__amount">
          <Amount
            value={transaction.amount}
            code={transaction.currency}
            showColor={transaction.kind !== Transfer}
          />
          {transaction.kind === Transfer && this.renderLinkedAmount()}
        </div>
        <div className="transaction-item__edit">
          <Button
            circular
            basic
            icon="pencil"
            onClick={this.handleEditClick}
            disabled={transaction.archived}
          />
        </div>
      </div>
    );
  }

  renderArrow() {
    const { kind, tags, note } = this.props.transaction;
    if (kind !== Transfer && !tags && !note) return;

    return (
      <Icon
        color="grey"
        name={kind === Income ? 'arrow left' : 'arrow right'}
      />
    );
  }

  renderLinkedAmount() {
    const { linkedAmount, linkedCurrency, currency } = this.props.transaction;
    if (!linkedCurrency || linkedCurrency === currency) return;

    return (
      <span>
        <Icon color="grey" name="arrow right" />
        <Amount value={linkedAmount} code={linkedCurrency} showColor={false} />
      </span>
    );
  }
}

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    kind: PropTypes.oneOf([Expense, Transfer, Income]),
    id: PropTypes.string,
    accountId: PropTypes.string,
    accountName: PropTypes.string,
    amount: PropTypes.number,
    currency: PropTypes.string,
    linkedAccountId: PropTypes.string,
    linkedAccountName: PropTypes.string,
    linkedAmount: PropTypes.number,
    linkedCurrency: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    note: PropTypes.string,
    date: PropTypes.number
  }),
  openTransactionInModal: PropTypes.func
};

export default TransactionItem;
