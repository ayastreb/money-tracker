import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'

class Report extends React.Component {
  render() {
    return <Loader active={this.props.isLoading} />
  }
}

Report.propTypes = {
  isLoading: PropTypes.bool
}

export default Report
