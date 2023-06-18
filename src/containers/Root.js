import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import ErrorBoundary from 'components/Sentry/ErrorBoundary';

import { useAuth0 } from '@auth0/auth0-react';

const WithUserInfo = ({ children }) => {
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  if (isLoading) {
    return <div>Loading user info...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Auth Error:</h1>
        {error}
      </div>
    );
  }

  if (isAuthenticated && user && user.couchDB) {
    localStorage.setItem('userInfo', JSON.stringify({ couchDB: user.couchDB }));
  }

  return children;
};

const Root = ({ store, history }) => (
  <ErrorBoundary>
    <Auth0Provider
      domain="money-tracker.auth0.com"
      clientId="NnttWrjWNjJjbhORjkIOrUVs07wF0UfN"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <WithUserInfo>
          <App history={history} />
        </WithUserInfo>
      </Provider>
    </Auth0Provider>
  </ErrorBoundary>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
