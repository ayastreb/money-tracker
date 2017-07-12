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
import Auth from './Auth'
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
        <div>
          <Route path="/auth" exact={true} component={Auth} />
          {routes.map(this.renderNavigationRoute)}
        </div>
      </Router>
    )
  }

  /**
   * Navigation routes are the pages associated to navigation menu items,
   * e.g. Dashboard, Transactions, Settings etc.
   * They are rendered with common structure using sidebar menu and sticky header.
   *
   * @param {object} route item from ../router/routes.js
   */
  renderNavigationRoute = route => {
    const wrapperClassName = this.props.isSidebarOpen || !this.props.isMobile
      ? 'openSidebar'
      : 'closedSidebar'
    return (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        render={props => (
          <div className={wrapperClassName}>
            <SidebarMenu />
            <Dimmer.Dimmable className="container">
              <SidebarDimmer />
              <Header label={route.label} />
              <SyncWarning />
              <route.component {...props} />
            </Dimmer.Dimmable>
          </div>
        )}
      />
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
