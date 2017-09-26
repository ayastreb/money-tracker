import React from 'react'
import List from '../Dashboard/RecentTransactions'
import Filter from './Filter'

const Transactions = () => (
  <div className="container-full-page flat search-page">
    <Filter />
    <List />
  </div>
)

export default Transactions
