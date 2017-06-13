import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { Dimmer, Loader, Menu, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Logo from '../components/Logo'
import NavLink from '../components/NavLink'
import Welcome from './Welcome'
import Dashboard from './Dashboard'
import { loadSettings } from '../actions/settings'
import { toggleSidebar } from '../actions/ui/sidebar'

class App extends React.Component {
  handleDimmer = () => this.props.toggleSidebar()

  componentDidMount() {
    this.props.loadSettings()
  }

  render() {
    if (!this.props.isLoaded) return <Loader active />
    if (!this.props.isSetupComplete) return <Welcome />

    return (
      <BrowserRouter>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation={this.props.isMobile ? 'overlay' : 'push'}
            width="thin"
            color="blue"
            vertical
            visible={this.props.isSidebarOpen || !this.props.isMobile}
            icon="labeled"
          >
            <Logo />
            <NavLink label="Dashboard" to="/" icon="newspaper" exact={true} />
            <NavLink label="Transactions" to="/transactions" icon="exchange" />
            <NavLink label="Accounts" to="/accounts" icon="credit card" />
            <NavLink label="Reports" to="/reports" icon="line chart" />
            <NavLink
              label="Settings"
              to="/settings"
              icon="options"
              exact={true}
            />
          </Sidebar>
          <Sidebar.Pusher>
            <main>
              <Route exact path="/" component={Dashboard} />
              <Dimmer
                active={this.props.isMobile && this.props.isSidebarOpen}
                onClick={this.handleDimmer}
              />
            </main>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool,
  isSetupComplete: PropTypes.bool,
  isMobile: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  loadSettings: PropTypes.func,
  toggleSidebar: PropTypes.func
}

const mapStateToProps = state => ({
  isLoaded: state.settings.isLoaded,
  isSetupComplete: state.settings.isSetupComplete,
  isMobile: state.ui.isMobile,
  isSidebarOpen: state.ui.isSidebarOpen
})

export default connect(mapStateToProps, { loadSettings, toggleSidebar })(App)
