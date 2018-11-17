import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

class ExchangeRateTable extends React.Component {
  render() {
    const { base, secondary, exchangeRate } = this.props;
    return (
      <Table basic>
        <Table.Body>
          {secondary.map(code => (
            <Table.Row key={code}>
              <Table.Cell>
                1 {code} = {Number(1 / exchangeRate[code]).toFixed(6)} {base}
              </Table.Cell>
              <Table.Cell>
                1 {base} = {exchangeRate[code]} {code}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

ExchangeRateTable.propTypes = {
  base: PropTypes.string,
  secondary: PropTypes.arrayOf(PropTypes.string),
  exchangeRate: PropTypes.objectOf(PropTypes.number)
};

export default ExchangeRateTable;
