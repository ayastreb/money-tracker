import Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';
import 'chartist/dist/chartist.min.css';
import abbreviate from 'number-abbreviate';
import PropTypes from 'prop-types';
import React from 'react';
import ChartistGraph from 'react-chartist';

class ExpenseTags extends React.Component {
  render() {
    const options = {
      axisY: {
        offset: 70
      },
      axisX: {
        labelInterpolationFnc: value => abbreviate(value, 2)
      },
      reverseData: true,
      horizontalBars: true,
      plugins: [
        Chartist.plugins.tooltip({
          class: 'mono',
          currency: this.props.currency,
          anchorToPoint: true
        })
      ]
    };

    return (
      <ChartistGraph
        type="Bar"
        className="mt-report-expense-tags"
        style={{ height: `${this.props.data.labels.length * 3}em` }}
        data={this.props.data}
        options={options}
      />
    );
  }
}

ExpenseTags.propTypes = {
  currency: PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    series: PropTypes.array
  })
};

export default ExpenseTags;
