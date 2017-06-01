import React from 'react'
import { currenciesAsDropdownOptions } from '../../data/currency'
import { Form, Dropdown, Button } from 'semantic-ui-react'

const CurrencyForm = ({
  base,
  secondary,
  onBaseChange,
  onSecondaryChange,
  onSubmit
}) => {
  const options = currenciesAsDropdownOptions()
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Main Currency</label>
        <Dropdown
          search
          selection
          minCharacters={0}
          onChange={onBaseChange}
          options={options}
          value={base}
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
          minCharacters={0}
          onChange={onSecondaryChange}
          options={options.filter(option => option.key !== base)}
          value={secondary}
        />
      </Form.Field>
      <Button primary content="Next" floated="right" />
    </Form>
  )
}

export default CurrencyForm
