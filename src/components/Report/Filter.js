import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

class Filter extends React.Component {
  handleAccountsChange = (_, { value }) => {
    this.props.changeReportAccounts(value)
  }

  render() {
    return (
      <Dropdown
        multiple
        selection
        fluid
        placeholder="Specify accounts"
        value={this.props.accounts}
        options={this.props.accountOptions}
        onChange={this.handleAccountsChange}
      />
    )
  }
}

Filter.propTypes = {
  accounts: PropTypes.array,
  accountOptions: PropTypes.array,
  changeReportAccounts: PropTypes.func
}

export default Filter
