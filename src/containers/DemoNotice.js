import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Button } from 'semantic-ui-react';
import { isDemoUser } from 'features/user/state/User.selector';

class DemoNotice extends React.Component {
  render() {
    if (!this.props.isVisible) return null;

    return (
      <Message
        size="large"
        icon="user circle outline"
        header="Welcome to demo account!"
        content={
          <div style={{ marginTop: '0.5em' }}>
            <p>
              You are logged in as a demo user with sample data generated to
              show you how things might look like.
            </p>
            <p>
              All the changes you make will only be stored locally on your
              device.
            </p>
            <p>
              <Button
                as="a"
                href="https://app.moneytracker.cc"
                icon="sign in"
                content="Go to Live app"
                labelPosition="right"
              />
            </p>
          </div>
        }
      />
    );
  }
}

DemoNotice.propTypes = {
  isVisible: PropTypes.bool
};

const mapStateToProps = state => ({
  isVisible: isDemoUser(state)
});

export default connect(mapStateToProps)(DemoNotice);
