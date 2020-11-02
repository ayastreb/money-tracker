import { connect } from 'react-redux';
import { updateExchangeRate } from '../../../actions/settings';
import {
  getBaseCurrency,
  getSecondaryCurrency,
  getExchangeRate
} from '../../../selectors/settings';
import ExchangeRate from '../../../components/Settings/Currency/ExchangeRate';

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  secondary: getSecondaryCurrency(state),
  exchangeRate: getExchangeRate(state),
  isLoading: state.ui.settings.isExchangeLoading,
  isMobile: state.ui.isMobile
});

export default connect(
  mapStateToProps,
  { updateExchangeRate }
)(ExchangeRate);
