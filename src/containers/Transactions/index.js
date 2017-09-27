import React from 'react'
import { connect } from 'react-redux'
import List from './List'
import Filter from './Filter'
import Pager from './Pager'
import Footer from './Footer'
import { loadFilterTransactions } from '../../actions/entities/transactions'

class Transactions extends React.Component {
  componentWillMount() {
    this.props.loadFilterTransactions()
  }

  render() {
    return (
      <div className="container-full-page flat search-page">
        <Filter />
        <List />
        <Pager />
        <Footer />
      </div>
    )
  }
}

export default connect(undefined, { loadFilterTransactions })(Transactions)
