import Chartist from 'chartist'
import 'chartist-plugin-tooltips'
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css'
import 'chartist/dist/chartist.min.css'
import abbreviate from 'number-abbreviate'
import PropTypes from 'prop-types'
import React from 'react'
import ChartistGraph from 'react-chartist'

class NetWorth extends React.Component {
  render() {
    const options = {
      showArea: true,
      low: 0,
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
        type="Line"
        className="ct-octave mt-report-net-worth"
        data={this.props.data}
        options={options}
      />
    )
  }
}

NetWorth.propTypes = {
  currency: PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    series: PropTypes.array
  })
}

export default NetWorth
