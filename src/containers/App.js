import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Welcome from './Welcome'
import Dashboard from './Dashboard'
import { loadSettings } from '../actions/settings'

class App extends React.Component {
  componentDidMount() {
    this.props.loadSettings()
  }

  render() {
    if (!this.props.isLoaded) return <Loader active />
    if (!this.props.isSetupComplete) return <Welcome />

    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Dashboard} />
        </div>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool,
  isSetupComplete: PropTypes.bool,
  loadSettings: PropTypes.func
}

const mapStateToProps = state => ({
  isLoaded: state.settings.isLoaded,
  isSetupComplete: state.settings.isSetupComplete
})

export default connect(mapStateToProps, { loadSettings })(App)
