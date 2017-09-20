import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import { Icon, Label } from 'semantic-ui-react'
import Amount from '../../Amount'
import { EXPENSE, TRANSFER, INCOME } from '../../../entities/Transaction'

class TransactionItem extends React.Component {
  render() {
    return (
      <div className="transaction-item">
        <div className="transaction-item__date">
          {format(new Date(this.props.date), 'DD MMM')}
        </div>
        <div className="transaction-item__info">
          {this.props.accountName}
          {this.renderArrow()}
          {this.props.kind === TRANSFER && this.props.linkedAccountName}
          {this.props.tags.map(tag => <Label key={tag}>{tag}</Label>)}
          <span className="transaction-item__info__note">
            {this.props.note}
          </span>
        </div>
        <div className="transaction-item__amount">
          <Amount
            value={this.props.amount}
            code={this.props.currency}
            showColor={this.props.kind !== TRANSFER}
          />
          {this.props.kind === TRANSFER && this.renderLinkedAmount()}
        </div>
      </div>
    )
  }

  renderArrow() {
    const { kind, tags, note } = this.props
    if (kind !== TRANSFER && !tags.length && !note.length) return

    return (
      <Icon
        color="grey"
        name={kind === INCOME ? 'long arrow left' : 'long arrow right'}
      />
    )
  }

  renderLinkedAmount() {
    const { linkedAmount, linkedCurrency, currency } = this.props
    if (!linkedCurrency || linkedCurrency === currency) return

    return (
      <span>
        <Icon color="grey" name="long arrow right" />
        <Amount value={linkedAmount} code={linkedCurrency} showColor={false} />
      </span>
    )
  }
}

TransactionItem.propTypes = {
  kind: PropTypes.oneOf([EXPENSE, TRANSFER, INCOME]),
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
}

export default TransactionItem
