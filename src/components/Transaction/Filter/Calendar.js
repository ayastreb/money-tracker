import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const currentYear = new Date().getFullYear()
const fromMonth = new Date(currentYear - 8, 0)
const toMonth = new Date(currentYear + 2, 11)

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths()

  const years = []
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i)
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form
    onChange(new Date(year.value, month.value))
  }

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={i} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) => (
          <option key={i} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  )
}

class Calendar extends React.Component {
  state = {
    month: null,
    from: null,
    to: null
  }

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }

  handleYearMonthChange = month => {
    this.setState({ month })
  }

  handleResetClick = () => {
    this.setState({
      month: null,
      from: null,
      to: null
    })
  }

  handleApplyClick = () => {
    const { from, to } = this.state

    this.props.changeFilterDate({
      dateStart: from.setHours(0, 0, 0),
      dateEnd: (to && to.setHours(23, 59, 59)) || from.setHours(23, 59, 59)
    })
    this.props.toggleFilterCalendar()
  }

  render() {
    const { month, from, to } = this.state

    return (
      <Modal
        open={this.props.isCalendarOpen}
        onClose={this.props.toggleFilterCalendar}
        className="transactions-filter-modal"
        closeIcon
        size="small"
      >
        <Modal.Header>Show transactions in range</Modal.Header>
        <Modal.Content>
          <DayPicker
            className="Range"
            fixedWeeks
            enableOutsideDays
            numberOfMonths={this.props.isMobile ? 1 : 2}
            selectedDays={[from, { from, to }]}
            month={month}
            captionElement={
              <YearMonthForm onChange={this.handleYearMonthChange} />
            }
            onDayClick={this.handleDayClick}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button content="Reset" onClick={this.handleResetClick} />
          <Button
            content="Apply"
            onClick={this.handleApplyClick}
            positive
            disabled={this.state.from === null && this.state.to === null}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Calendar
