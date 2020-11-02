import { connect } from 'react-redux';
import Filter from '../../components/Report/Filter';
import {
  changeReportAccounts,
  changeReportExcludedTags
} from '../../actions/ui/report';
import { getAccountsAsOptions } from '../../selectors/entities/accounts';
import { getAllTagsOptions } from '../../selectors/entities/tags';

const mapStateToProps = state => ({
  accounts: state.ui.report.accounts,
  accountOptions: getAccountsAsOptions(state),
  excludeTags: state.ui.report.excludeTags,
  tagsOptions: getAllTagsOptions(state)
});

export default connect(
  mapStateToProps,
  { changeReportAccounts, changeReportExcludedTags }
)(Filter);
