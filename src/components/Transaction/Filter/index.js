import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Icon, Button } from 'semantic-ui-react'
import Calendar from './Calendar'
import Filters from './Filters'
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
      <div className="transactions-filter">
        <Button.Group basic fluid>
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
          <Button
            icon="filter"
            labelPosition="left"
            content="Filter by&hellip;"
            onClick={this.props.toggleFilterModal}
          />
          <Button icon>
            <Icon name="plus" />
          </Button>
        </Button.Group>
        <Calendar {...this.props} />
        <Filters {...this.props} />
      </div>
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
  appliedTags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  changeFilterDate: PropTypes.func,
  toggleFilterCalendar: PropTypes.func,
  toggleFilterModal: PropTypes.func,
  applyFilters: PropTypes.func
}

export default Filter
