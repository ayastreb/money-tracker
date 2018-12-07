import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Header } from 'semantic-ui-react';
import Logo from '../Logo';
import { toggleSidebar } from '../../actions/ui/sidebar';
import { sync } from '../../actions/ui/sync';
import { isSignedIn } from 'features/user/state/User.selector';
import './index.css';

const AppHeader = ({
  label,
  isMobile,
  isAuthenticated,
  isSyncRunning,
  hasPendingChanges,
  toggleSidebar,
  sync
}) => (
  <header>
    <Header>
      {isMobile && <Icon name="bars" onClick={toggleSidebar} />}
      {!isMobile && <Logo />}
      <Header.Content as="h2">{label}</Header.Content>
      {isAuthenticated &&
        (isSyncRunning ? (
          <Icon name="refresh" loading />
        ) : (
          <Icon
            name="refresh"
            color={hasPendingChanges ? 'olive' : undefined}
            onClick={sync}
            style={{ cursor: 'pointer' }}
          />
        ))}
    </Header>
  </header>
);

AppHeader.propTypes = {
  label: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isSyncRunning: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  sync: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isMobile: state.ui.isMobile,
  isAuthenticated: isSignedIn(state),
  isSyncRunning: state.ui.sync.isRunning,
  hasPendingChanges: state.ui.sync.hasPendingChanges
});

export default connect(
  mapStateToProps,
  { toggleSidebar, sync }
)(AppHeader);
