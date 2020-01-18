import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import Filter from './Filter';
import Pager from './Pager';
import Footer from './Footer';
import { loadAccounts } from '../../actions/entities/accounts';
import { loadTags } from '../../actions/entities/tags';
import { loadFilterTransactions } from '../../actions/entities/transactions';
import { applyFilters } from '../../actions/ui/transaction/filter';

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.props.applyFilters({
      accounts: props.match.params.accountId
        ? [props.match.params.accountId]
        : []
    });
  }

  componentDidMount() {
    this.props.loadAccounts();
    this.props.loadTags();
    this.props.loadFilterTransactions();
  }

  render() {
    return (
      <div className="container-full-page flat search-page">
        <Filter selectedAccount={this.props.match.params.accountId} />
        <List />
        <Pager />
        <Footer />
      </div>
    );
  }
}

export default connect(undefined, {
  loadAccounts,
  loadTags,
  loadFilterTransactions,
  applyFilters
})(Transactions);
