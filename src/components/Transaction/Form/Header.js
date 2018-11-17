import React from 'react';
import { Menu } from 'semantic-ui-react';
import { kindLabel, TransationKindT } from '../../../entities/Transaction';

const Header = ({ withTransfer, activeKind, changeKind }) => {
  const { Expense, Transfer, Income } = TransationKindT;
  const kinds = withTransfer ? [Expense, Transfer, Income] : [Expense, Income];
  return (
    <Menu attached="top" widths={kinds.length}>
      {kinds.map(kind => (
        <Menu.Item
          key={kind}
          color={kind === Expense ? 'red' : kind === Income ? 'green' : 'black'}
          name={kindLabel(kind)}
          active={kind === activeKind}
          onClick={() => changeKind(kind)}
        />
      ))}
    </Menu>
  );
};

export default Header;
