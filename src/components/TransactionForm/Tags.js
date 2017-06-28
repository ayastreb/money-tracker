import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import { DropdownOption } from '../types'

class Tags extends React.Component {
  render() {
    return (
      <Dropdown
        multiple
        selection
        search
        allowAdditions
        closeOnChange
        placeholder="Choose existing tags or add new"
        value={this.props.value}
        options={this.props.options}
        onChange={this.props.onChange}
        onAddItem={this.props.onAddItem}
      />
    )
  }
}

Tags.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(DropdownOption).isRequired,
  onChange: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired
}

export default Tags
