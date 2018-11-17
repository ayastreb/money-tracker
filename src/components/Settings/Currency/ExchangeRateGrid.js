import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const ExchangeRateGrid = props => {
  const currencies = [props.base, ...props.secondary];
  return (
    <Table celled unstackable definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {currencies.map(code => (
            <Table.HeaderCell key={code} textAlign="center" content={code} />
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {currencies.map(code => (
          <Table.Row key={code}>
            <Table.Cell textAlign="center" content={code} />
            {currencies.map(other => {
              const rate = props.exchangeRate[other] / props.exchangeRate[code];
              return (
                <Table.Cell
                  key={`${code}-${other}`}
                  disabled={code === other}
                  textAlign="center"
                  content={Number(rate).toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: rate < 0.001 ? 6 : 4
                  })}
                />
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

ExchangeRateGrid.propTypes = {
  base: PropTypes.string,
  secondary: PropTypes.arrayOf(PropTypes.string),
  exchangeRate: PropTypes.objectOf(PropTypes.number)
};

export default ExchangeRateGrid;
