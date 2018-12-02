import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './App';
import ErrorBoundary from 'components/Sentry/ErrorBoundary';

const Root = ({ store, history }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </ErrorBoundary>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
