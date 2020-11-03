import React from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import abbreviate from 'number-abbreviate';
import 'chartist-plugin-tooltips';
import 'chartist/dist/chartist.min.css';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';
import Amount from '../../Amount';
import { Statistic } from 'semantic-ui-react';
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
    const series = data.series[0].map(
      (income, idx) => income - data.series[1][idx]
    );
    const nonEmptyValues = series.filter(val => val !== 0);

    return (
      <React.Fragment>
        {nonEmptyValues.length > 0 && (
          <div className="mt-report-stats">
            <Statistic.Group size="mini">
              <Statistic>
                <Statistic.Value>
                  <Amount
                    code={base}
                    value={Currency.numberToCents(
                      nonEmptyValues.reduce((sum, cur) => sum + cur, 0),
                      base
                    )}
                    showCents={false}
                  />
                </Statistic.Value>
                <Statistic.Label>Total net income</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  <Amount
                    code={base}
                    value={Currency.numberToCents(
                      nonEmptyValues.reduce((sum, cur) => sum + cur, 0) /
                        nonEmptyValues.length,
                      base
                    )}
                    showCents={false}
                  />
                </Statistic.Value>
                <Statistic.Label>Average net income</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </div>
        )}
        <ChartistGraph
          type="Bar"
          className="ct-octave mt-report-expense-income"
          data={{ ...data, series: [series] }}
          options={options}
          listener={{
            draw: data => {
              if (data.type === 'bar' && data.value.y < 0) {
                data.element.attr({ style: 'stroke: #f44336' });
              }
            }
          }}
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
