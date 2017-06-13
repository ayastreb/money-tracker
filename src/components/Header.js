import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Header } from 'semantic-ui-react'
import { toggleSidebar } from '../actions/ui/sidebar'
import './header.css'

class AppHeader extends React.Component {
  handleToggle = () => this.props.toggleSidebar()

  render() {
    return (
      <header>
        <Header>
          {this.props.isMobile &&
            <Icon name="bars" onClick={this.handleToggle} />}
          <Header.Content as="h2">{this.props.label}</Header.Content>
        </Header>
      </header>
    )
  }
}

AppHeader.propTypes = {
  label: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isMobile: state.ui.isMobile
})

export default connect(mapStateToProps, { toggleSidebar })(AppHeader)
