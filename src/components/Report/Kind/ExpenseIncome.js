import React from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import abbreviate from 'number-abbreviate';
import 'chartist-plugin-tooltips';
import 'chartist/dist/chartist.min.css';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';
import { Statistic } from 'semantic-ui-react';
import Amount from '../../Amount';
import Currency from '../../../entities/Currency';

class ExpenseIncome extends React.Component {
  render() {
    const options = {
      axisY: {
        labelInterpolationFnc: value => abbreviate(value, 2)
      },
      plugins: [
        Chartist.plugins.tooltip({
          class: 'mono',
          currency: this.props.currency,
          anchorToPoint: true
        })
      ]
    };
    const { data, base } = this.props;
    const income = data.series ? data.series[0].filter(val => val !== 0) : [];
    const expense = data.series ? data.series[1].filter(val => val !== 0) : [];

    return (
      <React.Fragment>
        <div className="mt-report-stats">
          <Statistic.Group size="mini">
            <Statistic>
              <Statistic.Value>
                <Amount
                  code={base}
                  value={Currency.numberToCents(
                    income.reduce((sum, cur) => sum + cur, 0),
                    base
                  )}
                  showCents={false}
                />
              </Statistic.Value>
              <Statistic.Label>Total income</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                <Amount
                  code={base}
                  value={
                    Currency.numberToCents(
                      expense.reduce((sum, cur) => sum + cur, 0),
                      base
                    ) * -1
                  }
                  showCents={false}
                />
              </Statistic.Value>
              <Statistic.Label>Total expense</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>
        <ChartistGraph
          type="Bar"
          className="ct-octave mt-report-expense-income"
          data={data}
          options={options}
        />
      </React.Fragment>
    );
  }
}

ExpenseIncome.propTypes = {
  currency: PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    series: PropTypes.array
  })
};

export default ExpenseIncome;
