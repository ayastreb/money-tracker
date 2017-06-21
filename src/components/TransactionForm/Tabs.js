import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { TRANSACTION_KINDS } from '../../constants/transaction'

const Tabs = props => (
  <Menu attached="top" widths={TRANSACTION_KINDS.length}>
    {TRANSACTION_KINDS.map(kind => (
      <Menu.Item
        key={kind}
        name={kind}
        active={kind === props.kind}
        onClick={() => props.changeTransactionKind(kind)}
      />
    ))}
  </Menu>
)

Tabs.propTypes = {
  kind: PropTypes.oneOf(TRANSACTION_KINDS),
  changeTransactionKind: PropTypes.func
}

export default Tabs
