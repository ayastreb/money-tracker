import { connect } from 'react-redux';
import { changeSettingsCurrency } from '../../../actions/settings';
import {
  getBaseCurrency,
  getSecondaryCurrency
} from '../../../selectors/settings';
import Input from '../../../components/Settings/Currency/Input';

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  secondary: getSecondaryCurrency(state)
});

export default connect(
  mapStateToProps,
  { changeSettingsCurrency }
)(Input);
