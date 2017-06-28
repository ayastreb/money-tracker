import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Form, Input } from 'semantic-ui-react'
import { DropdownOption } from '../types'

class Footer extends React.Component {
  render() {
    const formClassName = this.props.tags === undefined
      ? 'transaction-form-grid single-line'
      : 'transaction-form-grid'
    return (
      <div className={formClassName}>
        <div className="transaction-form-grid__column-wide">
          {this.props.tags !== undefined &&
            <div className="transaction-form-grid__field">
              <Form.Field>
                <label>Tags</label>
                <Dropdown
                  multiple
                  selection
                  search
                  allowAdditions
                  closeOnChange
                  placeholder="Choose existing tags or add new"
                  value={this.props.tags}
                  options={this.props.tagsOptions}
                  onChange={this.props.onTagsChange}
                  onAddItem={this.props.onAddTag}
                />
              </Form.Field>
            </div>}
          <div className="transaction-form-grid__field">
            <Form.Field>
              <Input
                placeholder="Note"
                value={this.props.note}
                onChange={this.props.onNoteChange}
              />
            </Form.Field>
          </div>
        </div>
        <div className="transaction-form-grid__column-narrow">
          <div className="transaction-form-grid__field">
            <Form.Field>
              <Input
                required
                fluid
                type="date"
                value={this.props.date}
                onChange={this.props.onDateChange}
              />
            </Form.Field>
          </div>
          <div className="transaction-form-grid__field">
            <Button primary fluid>{this.props.buttonLabel}</Button>
          </div>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onTagsChange: PropTypes.func,
  onAddTag: PropTypes.func,
  onNoteChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired
}

export default Footer
