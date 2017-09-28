import { connect } from 'react-redux'
import Footer from '../../components/Transaction/List/Footer'
import { getFilterTotal } from '../../selectors/entities/transactions'
import { getBaseCurrency } from '../../selectors/settings'
import { INCOME, EXPENSE } from '../../entities/Transaction'

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  income: getFilterTotal(INCOME)(state),
  expense: getFilterTotal(EXPENSE)(state)
})

export default connect(mapStateToProps)(Footer)
