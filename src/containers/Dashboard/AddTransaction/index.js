import React from 'react'
import { connect } from 'react-redux'
import { Menu, Segment } from 'semantic-ui-react'
import ExpenseForm from './ExpenseForm'
import TransferForm from './TransferForm'
import IncomeForm from './IncomeForm'
import { EXPENSE, TRANSFER, INCOME } from '../../../entities/Transaction'
import { changeTransactionKind } from '../../../actions/ui/transactionForm'

class AddTransaction extends React.Component {
  render() {
    const kinds = [EXPENSE, TRANSFER, INCOME]
    return (
      <div>
        <Menu attached="top" widths={kinds.length}>
          {kinds.map(kind => (
            <Menu.Item
              key={kind}
              name={kind}
              active={kind === this.props.kind}
              onClick={() => this.props.changeTransactionKind(kind)}
            />
          ))}
        </Menu>
        <Segment attached="bottom">
          {this.props.kind === EXPENSE && <ExpenseForm />}
          {this.props.kind === TRANSFER && <TransferForm />}
          {this.props.kind === INCOME && <IncomeForm />}
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
