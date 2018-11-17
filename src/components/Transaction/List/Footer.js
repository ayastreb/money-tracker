import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import Amount from '../../Amount';

const Footer = ({ base, income, expense }) => (
  <div className="transactions-list-footer">
    <Table fixed basic="very" unstackable>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Total income</Table.Cell>
          <Table.Cell textAlign="right">
            <Amount code={base} value={income} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Total expense</Table.Cell>
          <Table.Cell textAlign="right">
            <Amount code={base} value={expense} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell />
          <Table.Cell textAlign="right">
            <Amount code={base} value={income + expense} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
);

Footer.propTypes = {
  base: PropTypes.string,
  income: PropTypes.number,
  expense: PropTypes.number
};

export default Footer;
