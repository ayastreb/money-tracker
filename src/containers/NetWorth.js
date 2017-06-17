import { connect } from 'react-redux'
import NetWorth from '../components/NetWorth/index'
import { getNetWorth } from '../selectors/accounts'

const mapStateToProps = state => ({
  baseCurrency: state.settings.currency.base,
  netWorth: getNetWorth(state)
})

export default connect(mapStateToProps)(NetWorth)
