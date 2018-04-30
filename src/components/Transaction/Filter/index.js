import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button } from 'semantic-ui-react'
import Calendar from './Calendar'
import Filters from './Filters'
import AppliedFilters from './AppliedFilters'
import DateRange from '../../../entities/Transaction/FilterDateRange'
import { DropdownOption } from '../../types'
import './index.css'

class Filter extends React.Component {
  options = DateRange.options()
  lastValue = DateRange.defaultRange

  handleDateRange = (event, { value }) => {
    if (value === this.lastValue) return

    if (value === 'custom') {
      this.props.toggleFilterCalendar()
    } else {
      this.props.changeFilterDate({
        dateStart: DateRange.rangeStart(value),
        dateEnd: DateRange.rangeEnd(value)
      })
      this.lastValue = value
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-header">
          <Button.Group basic fluid>
            <Button
              icon="plus"
              labelPosition="left"
              content="New"
              onClick={() => this.props.openTransactionInModal()}
            />
            <Dropdown
              button
              className="icon"
              options={this.options}
              defaultValue={DateRange.defaultRange}
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
    )
  }
}

Filter.propTypes = {
  isMobile: PropTypes.bool,
  dateRangeLabel: PropTypes.string,
  isCalendarOpen: PropTypes.bool,
  isFilterModalOpen: PropTypes.bool,
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
}

export default Filter
