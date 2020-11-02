import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { DropdownOption } from '../types';

class Filter extends React.Component {
  handleAccountsChange = (_, { value }) => {
    this.props.changeReportAccounts(value);
  };

  handleTagsChange = (_, { value }) => {
    this.props.changeReportExcludedTags(value);
  };

  render() {
    return (
      <div className="container-footer">
        <Dropdown
          multiple
          selection
          fluid
          placeholder="Specify accounts"
          value={this.props.accounts}
          options={this.props.accountOptions}
          onChange={this.handleAccountsChange}
        />
        <Dropdown
          multiple
          selection
          fluid
          search
          placeholder="Exclude tags"
          value={this.props.excludeTags}
          options={this.props.tagsOptions}
          onChange={this.handleTagsChange}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  accounts: PropTypes.array,
  accountOptions: PropTypes.array,
  changeReportAccounts: PropTypes.func,
  excludeTags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  changeReportExcludedTags: PropTypes.func
};

export default Filter;
