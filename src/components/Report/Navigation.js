import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button } from 'semantic-ui-react'

class Navigation extends React.Component {
  handleKindChange = (_, { value }) => {
    this.props.changeReportKind(value)
  }

  handleTimespanChange = (_, { value }) => {
    this.props.changeReportTimespan(value)
  }

  render() {
    return (
      <div className="container-header">
        <Button.Group basic>
          <Dropdown
            button
            value={this.props.kind}
            options={this.props.kindOptions}
            onChange={this.handleKindChange}
          />
          <Button
            icon="chevron left"
            onClick={this.props.moveReportDateBackwards}
          />
          <Dropdown
            basic
            button
            icon={false}
            text={this.props.timespanLabel}
            value={this.props.timespan}
            options={this.props.timespanOptions}
            onChange={this.handleTimespanChange}
          />
          <Button
            icon="chevron right"
            onClick={this.props.moveReportDateForwards}
          />
        </Button.Group>
      </div>
    )
  }
}

Navigation.propTypes = {
  kind: PropTypes.string,
  kindOptions: PropTypes.array,
  timespan: PropTypes.string,
  timespanLabel: PropTypes.string,
  timespanOptions: PropTypes.array,
  changeReportKind: PropTypes.func,
  changeReportTimespan: PropTypes.func,
  moveReportDateBackwards: PropTypes.func,
  moveReportDateForwards: PropTypes.func
}

export default Navigation
