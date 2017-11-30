import React from 'react'
import { Menu } from 'semantic-ui-react'
import Transaction, {
  EXPENSE,
  TRANSFER,
  INCOME
} from '../../../entities/Transaction'

const Header = ({ withTransfer, activeKind, changeKind }) => {
  const kinds = withTransfer ? [EXPENSE, TRANSFER, INCOME] : [EXPENSE, INCOME]
  return (
    <Menu attached="top" widths={kinds.length}>
      {kinds.map(kind => (
        <Menu.Item
          key={kind}
          color={kind === EXPENSE ? 'red' : kind === INCOME ? 'green' : 'black'}
          name={Transaction.kindLabel(kind)}
          active={kind === activeKind}
          onClick={() => changeKind(kind)}
        />
      ))}
    </Menu>
  )
}

export default Header
