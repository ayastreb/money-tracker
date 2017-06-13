import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { Loader, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'
import routes from '../routes'
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
      <BrowserRouter>
        <Sidebar.Pushable>
          <SidebarMenu />
          <Sidebar.Pusher>
            <SidebarDimmer />
            {routes.map(route => <Route {...route} />)}
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
