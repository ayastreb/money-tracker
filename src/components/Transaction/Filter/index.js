import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Icon, Button } from 'semantic-ui-react'
import Calendar from './Calendar'
import DateRange from '../../../entities/Transaction/FilterDateRange'
import './index.css'

class Filter extends React.Component {
  options = DateRange.options()

  handleDateRange = (event, { value }) => {
    if (value === 'custom') {
      this.props.toggleFilterCalendar()
    } else {
      this.props.changeFilterDate({
        dateStart: DateRange.rangeStart(value),
        dateEnd: DateRange.rangeEnd(value)
      })
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
          />
          <Button icon>
            <Icon name="plus" />
          </Button>
        </Button.Group>
        <Calendar {...this.props} />
      </div>
    )
  }
}

Filter.propTypes = {
  dateRangeLabel: PropTypes.string,
  isCalendarOpen: PropTypes.bool,
  changeFilterDate: PropTypes.func,
  toggleFilterCalendar: PropTypes.func
}

export default Filter
