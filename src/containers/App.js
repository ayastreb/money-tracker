import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'
import routes from '../router/routes'
import SidebarMenu from './SidebarMenu'
import SidebarDimmer from './SidebarDimmer'
import Welcome from './Welcome'
import SyncWarning from './SyncWarning'
import Header from '../components/Header'
import { loadSettings } from '../actions/settings'
import { loadAccounts } from '../actions/accounts'
import { windowResize } from '../actions/ui/windowResize'

class App extends React.Component {
  componentWillMount() {
    window.addEventListener('resize', throttle(this.props.windowResize, 500))
  }

  componentDidMount() {
    this.props.loadSettings()
    this.props.loadAccounts()
  }

  render() {
    if (!this.props.isLoaded) return <Loader active />
    if (!this.props.isSetupComplete) return <Welcome />

    return (
      <Router history={this.props.history}>
        <div
          className={
            this.props.isSidebarOpen || !this.props.isMobile
              ? 'openSidebar'
              : 'closedSidebar'
          }
        >
          <SidebarMenu />
          <Dimmer.Dimmable className="container">
            <SidebarDimmer />
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={() => (
                  <div>
                    <Header label={route.label} />
                    <SyncWarning />
                    <route.component />
                  </div>
                )}
              />
            ))}
          </Dimmer.Dimmable>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool,
  isSetupComplete: PropTypes.bool,
  isMobile: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  loadSettings: PropTypes.func,
  loadAccounts: PropTypes.func,
  windowResize: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  isLoaded: state.settings.isLoaded,
  isSetupComplete: state.settings.isSetupComplete,
  isMobile: state.ui.isMobile,
  isSidebarOpen: state.ui.isSidebarOpen
})

export default connect(mapStateToProps, {
  loadSettings,
  loadAccounts,
  windowResize
})(App)
