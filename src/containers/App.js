import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route } from 'react-router-dom'
import { Loader, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'
import routes from '../router/routes'
import SidebarMenu from './SidebarMenu'
import SidebarDimmer from './SidebarDimmer'
import Welcome from './Welcome'
import { loadSettings } from '../actions/settings'

class App extends React.Component {
  componentDidMount() {
    this.props.loadSettings()
  }

  render() {
    if (!this.props.isLoaded) return <Loader active />
    if (!this.props.isSetupComplete) return <Welcome />

    return (
      <Router history={this.props.history}>
        <Sidebar.Pushable>
          <SidebarMenu />
          <Sidebar.Pusher>
            <SidebarDimmer />
            {routes.map(route => <Route key={route.path} {...route} />)}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    )
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool,
  isSetupComplete: PropTypes.bool,
  loadSettings: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  isLoaded: state.settings.isLoaded,
  isSetupComplete: state.settings.isSetupComplete
})

export default connect(mapStateToProps, { loadSettings })(App)
