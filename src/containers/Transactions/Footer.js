import { connect } from 'react-redux'
import Footer from '../../components/Transaction/List/Footer'
import { getBaseCurrency } from '../../selectors/settings'

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  income: 0,
  expense: 0
})

export default connect(mapStateToProps)(Footer)
