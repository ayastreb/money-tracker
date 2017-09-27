import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class Calendar extends React.Component {
  state = {
    from: null,
    to: null
  }

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }

  handleResetClick = () => {
    this.setState({
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
    const { from, to } = this.state

    return (
      <Modal
        open={this.props.isCalendarOpen}
        onClose={this.props.toggleFilterCalendar}
        className="transactions-filter-modal"
        closeIcon
        size="tiny"
      >
        <Modal.Header>Show transactions in range</Modal.Header>
        <Modal.Content>
          <DayPicker
            className="Range"
            numberOfMonths={this.props.isMobile ? 1 : 2}
            fixedWeeks
            selectedDays={[from, { from, to }]}
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
