import React from 'react'
import Amount from './Amount'
import { Label, List, Icon } from 'semantic-ui-react'
import { ACCOUNT_TYPE } from '../constants'

const AccountList = ({ accounts, removeAccount }) => (
  <List divided relaxed>
    {accounts.map(account => (
      <List.Item key={account.id}>
        <List.Content floated="left">
          <Label
            as="a"
            pointing="right"
            onClick={() => removeAccount(account.id)}
          >
            <Icon name="trash" />{ACCOUNT_TYPE[account.type]}
          </Label>
          {account.name}
        </List.Content>
        <List.Content floated="right">
          <List style={{ padding: 0 }}>
            {Object.keys(account.balance).map(currency => (
              <List.Item key={currency}>
                <List.Content floated="right">
                  <Amount code={currency} value={account.balance[currency]} />
                </List.Content>
              </List.Item>
            ))}
          </List>
        </List.Content>
      </List.Item>
    ))}
  </List>
)

export default AccountList
