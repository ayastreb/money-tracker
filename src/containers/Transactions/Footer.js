import { connect } from 'react-redux';
import Footer from '../../components/Transaction/List/Footer';
import { getFilterTotal } from '../../selectors/entities/transactions';
import { getBaseCurrency } from '../../selectors/settings';
import { TransationKindT } from '../../entities/Transaction';

const mapStateToProps = state => ({
  base: getBaseCurrency(state),
  income: getFilterTotal(TransationKindT.Income)(state),
  expense: getFilterTotal(TransationKindT.Expense)(state)
});

export default connect(mapStateToProps)(Footer);
