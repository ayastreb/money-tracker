import React from 'react'
import { connect } from 'react-redux'
import { Menu, Segment } from 'semantic-ui-react'
import ExpenseForm from './ExpenseForm'
import TransferForm from './TransferForm'
import IncomeForm from './IncomeForm'
import {
  EXPENSE_TRANSACTION,
  INCOME_TRANSACTION,
  TRANSACTION_KINDS,
  TRANSFER_TRANSACTION
} from '../../constants/transaction'
import { changeTransactionKind } from '../../actions/ui/transactionForm'

class AddTransaction extends React.Component {
  render() {
    return (
      <div className="section transaction-form">
        <div className="section__header">
          <h3>Add Transaction</h3>
        </div>
        <Menu attached="top" widths={TRANSACTION_KINDS.length}>
          {TRANSACTION_KINDS.map(kind => (
            <Menu.Item
              key={kind}
              name={kind}
              active={kind === this.props.kind}
              onClick={() => this.props.changeTransactionKind(kind)}
            />
          ))}
        </Menu>
        <Segment attached="bottom">
          {this.props.kind === EXPENSE_TRANSACTION && <ExpenseForm />}
          {this.props.kind === TRANSFER_TRANSACTION && <TransferForm />}
          {this.props.kind === INCOME_TRANSACTION && <IncomeForm />}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  kind: state.ui.transactionForm.kind
})

export default connect(mapStateToProps, { changeTransactionKind })(
  AddTransaction
)
