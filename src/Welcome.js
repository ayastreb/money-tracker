import React, { Component } from 'react'
import { currenciesAsDropdownOptions } from './currency'
import {
  Container,
  Card,
  Step,
  Form,
  Dropdown,
  Button
} from 'semantic-ui-react'

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.currencies = currenciesAsDropdownOptions()
    this.state = {
      step: 'currency',
      mainCurrency: 'USD',
      additionalCurrencies: []
    }
  }

  onMainCurrencyChange = (_, data) => {
    this.setState(prevState => ({
      mainCurrency: data.value,
      additionalCurrencies: prevState.additionalCurrencies.filter(
        currency => currency !== data.value
      )
    }))
  }

  onAdditionalCurrencyChange = (_, data) => {
    this.setState(() => ({ additionalCurrencies: data.value }))
  }

  onCurrencyFormSubmit = event => {
    event.preventDefault()
    this.setState(() => ({ step: 'account' }))
  }

  render() {
    return (
      <Container text>
        <Card raised fluid>
          <Card.Content>
            <Card.Header>Welcome</Card.Header>
            <Step.Group fluid>
              <Step
                active={this.state.step === 'currency'}
                icon="dollar"
                title="Currency"
                description="Setup your currencies"
              />
              <Step
                active={this.state.step === 'account'}
                icon="credit card"
                title="Account"
                description="Create your accounts"
              />
            </Step.Group>

            <Form
              onSubmit={this.onCurrencyFormSubmit}
              style={{
                display: this.state.step === 'currency' ? 'block' : 'none'
              }}
            >
              <Form.Field>
                <label>Main Currency</label>
                <Dropdown
                  placeholder="Select main currency"
                  search
                  selection
                  value={this.state.mainCurrency}
                  options={this.currencies}
                  onChange={this.onMainCurrencyChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Additional Currencies (optional)</label>
                <Dropdown
                  placeholder="Select additional currencies"
                  search
                  selection
                  multiple
                  renderLabel={item => item.key}
                  value={this.state.additionalCurrencies}
                  options={this.currencies.filter(
                    currency => currency.key !== this.state.mainCurrency
                  )}
                  onChange={this.onAdditionalCurrencyChange}
                />
              </Form.Field>
              <Button content="Next" floated="right" />
            </Form>
          </Card.Content>
        </Card>
      </Container>
    )
  }
}

export default Welcome
