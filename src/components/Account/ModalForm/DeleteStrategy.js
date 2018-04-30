import React from 'react'
import { Button, Radio, Dropdown, Form, Progress } from 'semantic-ui-react'
import Account, { DELETE_STRATEGY_MOVE } from '../../../entities/Account'

class DeleteStrategy extends React.Component {
  state = {
    strategy: Account.defaultDeleteStrategy
  }

  onStrategyChange = (e, { value }) => {
    this.setState({ ...this.state, strategy: value })
  }

  onAccountChange = (e, { value }) => {
    this.setState({ ...this.state, moveTo: value })
  }

  onProceed = () => {
    this.props.removeAccount({
      id: this.props.form.id,
      strategy: this.state.strategy,
      moveTo: this.getMoveTo()
    })
  }

  getMoveTo = () =>
    this.state.moveTo ||
    (this.props.accountOptions.length && this.props.accountOptions[0].key)

  render() {
    const hasMultipleAccounts = this.props.accountOptions.length > 0
    return (
      <React.Fragment>
        <h3>You are about to delete account "{this.props.form.name}"</h3>
        <p style={{ marginTop: '1em' }}>
          What should we do with transactions linked to this account?
        </p>
        <Form>
          {Account.deleteStartegies(hasMultipleAccounts).map(strategy => (
            <Form.Field key={strategy.key}>
              <Radio
                name="deleteStrategy"
                label={strategy.text}
                value={strategy.value}
                checked={this.state.strategy === strategy.value}
                onChange={this.onStrategyChange}
                disabled={this.props.modal.isDeleteRunning}
              />
            </Form.Field>
          ))}
          {hasMultipleAccounts &&
            this.state.strategy === DELETE_STRATEGY_MOVE && (
              <Form.Field>
                <Dropdown
                  selection
                  value={this.getMoveTo()}
                  options={this.props.accountOptions}
                  onChange={this.onAccountChange}
                  disabled={this.props.modal.isDeleteRunning}
                />
              </Form.Field>
            )}
          <Form.Field>
            {this.props.modal.isDeleteRunning ? (
              <Progress
                value={this.props.modal.itemsProcessed}
                total={this.props.modal.itemsToProcess}
              />
            ) : (
              <Button
                negative
                labelPosition="right"
                icon="arrow right"
                content="Proceed"
                onClick={this.onProceed}
              />
            )}
          </Form.Field>
        </Form>
      </React.Fragment>
    )
  }
}

export default DeleteStrategy
