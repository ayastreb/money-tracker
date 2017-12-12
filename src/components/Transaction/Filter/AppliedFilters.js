import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'

class AppliedFilters extends React.Component {
  removeAppliedAccount = accountId => () => {
    this.props.applyFilters({
      accounts: this.props.appliedAccounts.filter(acc => acc !== accountId),
      tags: this.props.appliedTags
    })
  }

  removeAppliedTag = tag => () => {
    this.props.applyFilters({
      accounts: this.props.appliedAccounts,
      tags: this.props.appliedTags.filter(t => t !== tag)
    })
  }

  render() {
    if (
      this.props.appliedAccounts.length === 0 &&
      this.props.appliedTags.length === 0
    ) {
      return null
    }

    return (
      <div className="transactions-filters-applied">
        {this.props.appliedAccounts.map(accountId => (
          <Label
            key={accountId}
            content={this.props.accountNameMap[accountId]}
            icon="credit card"
            onRemove={this.removeAppliedAccount(accountId)}
          />
        ))}
        {this.props.appliedTags.map(tag => (
          <Label
            key={tag}
            content={tag}
            icon="tag"
            onRemove={this.removeAppliedTag(tag)}
          />
        ))}
      </div>
    )
  }
}

AppliedFilters.propTypes = {
  appliedTags: PropTypes.arrayOf(PropTypes.string),
  appliedAccounts: PropTypes.arrayOf(PropTypes.string),
  accountNameMap: PropTypes.object,
  applyFilters: PropTypes.func
}

export default AppliedFilters
