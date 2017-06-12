import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { Loader, Menu, Sidebar, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
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
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            color="blue"
            vertical
            visible
            icon="labeled"
          >
            <NavLink label="Dashboard" to="/" icon="home" exact={true} />
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
            <Segment basic>
              <Route exact path="/" component={Dashboard} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
