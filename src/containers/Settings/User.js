import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Popup, Button } from 'semantic-ui-react'
import { signOut } from '../../actions/user'
import { isUserAuthenticated } from '../../selectors/user'

class User extends React.Component {
  render() {
    if (this.props.isSignOutComplete) return <Redirect to="/" />

    return (
      <Popup
        on="click"
        trigger={
          <Button
            content={this.props.isAuthenticated ? 'Sign out' : 'Delete data'}
            icon={this.props.isAuthenticated ? 'sign out' : 'trash'}
            labelPosition="right"
          />
        }
        header="Local data will de deleted!"
        content={
          <Button
            content="Confirm"
            negative
            style={{ marginTop: '1em' }}
            floated="right"
            loading={this.props.isSignOutRunning}
            disabled={this.props.isSignOutRunning}
            onClick={this.props.signOut}
          />
        }
      />
    )
  }
}

User.propTypes = {
  isAuthenticated: PropTypes.bool,
  isSignOutRunning: PropTypes.bool,
  isSignOutComplete: PropTypes.bool,
  signOut: PropTypes.func
}

const mapStateToProps = state => ({
  isAuthenticated: isUserAuthenticated(state),
  isSignOutRunning: state.user.isSignOutRunning,
  isSignOutComplete: state.user.isSignOutComplete
})

export default connect(mapStateToProps, { signOut })(User)
