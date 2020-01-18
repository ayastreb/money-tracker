import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'semantic-ui-react';
import Calendar from './Calendar';
import Filters from './Filters';
import AppliedFilters from './AppliedFilters';
import {
  DateFilterRangeT,
  getDateRangeFilterOptions,
  defaultDateFilterRange,
  getDateFilterRangeStart,
  getDateFilterRangeEnd
} from 'entities/Transaction/DateFilterRange';
import { DropdownOption } from 'components/types';
import './index.css';

class Filter extends React.Component {
  options = getDateRangeFilterOptions();
  lastValue = defaultDateFilterRange;

  handleDateRange = (_, { value }) => {
    if (value === this.lastValue) return;
    if (value === DateFilterRangeT.custom) {
      this.props.toggleFilterCalendar();
    } else {
      this.props.changeFilterDate({
        dateStart: getDateFilterRangeStart(value),
        dateEnd: getDateFilterRangeEnd(value)
      });
      this.lastValue = value;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-header">
          <Button.Group basic fluid>
            <Button
              icon="plus"
              labelPosition="left"
              content="New"
              onClick={() =>
                this.props.openTransactionInModal({
                  ...(this.props.selectedAccount
                    ? { accountId: this.props.selectedAccount }
                    : {})
                })
              }
            />
            <Dropdown
              button
              className="icon"
              options={this.options}
              defaultValue={defaultDateFilterRange}
              onChange={this.handleDateRange}
              text={this.props.dateRangeLabel}
              labeled
              icon="calendar"
            />
            <Button icon="filter" onClick={this.props.toggleFilterModal} />
          </Button.Group>
          <Calendar {...this.props} />
          <Filters {...this.props} />
        </div>
        <AppliedFilters {...this.props} />
      </React.Fragment>
    );
  }
}

Filter.propTypes = {
  isMobile: PropTypes.bool,
  dateRangeLabel: PropTypes.string,
  isCalendarOpen: PropTypes.bool,
  isFilterModalOpen: PropTypes.bool,
  selectedAccount: PropTypes.string,
  appliedAccounts: PropTypes.arrayOf(PropTypes.string),
  accountOptions: PropTypes.arrayOf(DropdownOption),
  accountNameMap: PropTypes.object,
  appliedTags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  changeFilterDate: PropTypes.func,
  toggleFilterCalendar: PropTypes.func,
  toggleFilterModal: PropTypes.func,
  applyFilters: PropTypes.func,
  openTransactionInModal: PropTypes.func
};

export default Filter;
