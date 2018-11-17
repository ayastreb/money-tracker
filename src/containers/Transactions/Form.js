import { connect } from 'react-redux';
import TransactionForm from '../../components/Transaction/Form';
import {
  getAccountsCurrencyMap,
  getAccountsAsOptions
} from '../../selectors/entities/accounts';
import { getTagOptions } from '../../selectors/entities/tags';
import { saveTransaction } from '../../actions/entities/transactions';
import { loadTags } from '../../actions/entities/tags';
import {
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  addTag,
  changeTags,
  changeDate,
  changeNote
} from '../../actions/ui/form/transaction';

const mapStateToProps = state => ({
  form: state.ui.form.transaction,
  accountCurrency: getAccountsCurrencyMap(state),
  accountOptions: getAccountsAsOptions(state),
  tagsOptions: getTagOptions(state)
});

export default connect(
  mapStateToProps,
  {
    changeKind,
    changeAccount,
    changeAmount,
    changeCurrency,
    changeLinkedAccount,
    changeLinkedAmount,
    changeLinkedCurrency,
    changeDate,
    changeNote,
    addTag,
    changeTags,
    loadTags,
    saveTransaction
  }
)(TransactionForm);
