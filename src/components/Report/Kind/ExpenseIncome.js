import React from 'react'
import PropTypes from 'prop-types'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import abbreviate from 'number-abbreviate'
import 'chartist-plugin-tooltips'
import 'chartist/dist/chartist.min.css'
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css'

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
    }

    return (
      <ChartistGraph
        type="Bar"
        className="ct-octave mt-report-expense-income"
        data={this.props.data}
        options={options}
      />
    )
  }
}

ExpenseIncome.propTypes = {
  currency: PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    series: PropTypes.array
  })
}

export default ExpenseIncome
