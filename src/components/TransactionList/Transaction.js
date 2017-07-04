import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Label } from 'semantic-ui-react'
import Amount from '../Amount'
import format from 'date-fns/format'

class Transaction extends React.Component {
  render() {
    return (
      <div className="transaction-item">
        <div className="transaction-item__date">
          {format(new Date(this.props.date), 'DD MMM')}
        </div>
        <div className="transaction-item__info">
          {this.props.accountName}
          {this.renderArrow()}
          {this.props.linkedAccountName && this.props.linkedAccountName}
          {this.props.tags &&
            this.props.tags.map(tag => <Label key={tag}>{tag}</Label>)}
          <span className="transaction-item__info__note">
            {this.props.note}
          </span>
        </div>
        <div className="transaction-item__amount">
          <Amount
            value={this.props.amount}
            code={this.props.currency}
            showColor={!this.props.linkedAccountId}
          />
          {this.renderLinkedAmount()}
        </div>
      </div>
    )
  }

  renderArrow() {
    const { linkedAccountId, tags, note, amount } = this.props
    if (!linkedAccountId && !tags.length && !note.length) return

    return (
      <Icon
        color="grey"
        name={
          amount > 0 && !linkedAccountId
            ? 'long arrow left'
            : 'long arrow right'
        }
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

Transaction.propTypes = {
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
  date: PropTypes.string
}

export default Transaction
