import { connect } from 'react-redux'
import TransactionForm from '../components/TransactionForm'
import { changeTransactionKind } from '../actions/ui/transactionForm'
import { getAccountsAsOptions } from '../selectors/accounts'

const mapStateToProps = state => {
  const id = state.ui.transactionForm.accountId || state.accounts.allIds[0]
  const currencies = (id && state.accounts.byId[id].currencies) || []
  const currency = currencies.includes(state.settings.currency.base)
    ? state.settings.currency.base
    : currencies[0]
  return {
    isMobile: state.ui.isMobile,
    kind: state.ui.transactionForm.kind,
    accountId: id,
    currencies: currencies.map(code => ({
      key: code,
      value: code,
      text: code
    })),
    accounts: getAccountsAsOptions(state),
    currency
  }
}

export default connect(mapStateToProps, { changeTransactionKind })(
  TransactionForm
)
