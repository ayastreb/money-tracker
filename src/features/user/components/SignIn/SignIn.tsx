import React from 'react';
import { Redirect, Link, RouteProps } from 'react-router-dom';
import {
  Header,
  Divider,
  Form,
  Button,
  Input,
  Message,
  Loader
} from 'semantic-ui-react';
import { AsyncOperationStateT } from 'typings/async';
import {
  changeEmail,
  changeCode,
  sendCode,
  verifyCode,
  finishAuth
} from 'features/user/state/ui/SignIn.action';
import './index.css';

export interface SignInPropsT {
  isSignedIn: boolean;
  sendCodeStatus?: AsyncOperationStateT;
  verifyCodeStatus?: AsyncOperationStateT;
  email: string;
  code: string;
  error?: string;
  changeEmail: typeof changeEmail;
  changeCode: typeof changeCode;
  sendCode: typeof sendCode;
  verifyCode: typeof verifyCode;
  finishAuth: typeof finishAuth;
}

class Auth extends React.Component<SignInPropsT & RouteProps, {}> {
  componentDidMount() {
    if (this.props.location && this.props.location.hash) {
      this.props.finishAuth();
    }
  }

  render() {
    if (this.props.isSignedIn) return <Redirect to="/" />;
    if (this.props.location && this.props.location.hash) {
      return (
        <Loader
          active
          content="Synchronizing data, this might take a moment..."
        />
      );
    }

    return (
      <div className="container-raised-desktop">
        <Header as="h2" icon="id card outline" content="Sign In" />
        <Divider />
        {this.props.error && (
          <Message error>
            <Message.Header>Error</Message.Header>
            <Message.Content>{this.props.error}</Message.Content>
          </Message>
        )}
        {this.props.sendCodeStatus !== 'SUCCESS'
          ? this.renderSendCodeForm()
          : this.renderVerifyCodeForm()}
        <Divider />
        <p>
          <Link to="/">Back</Link>
        </p>
      </div>
    );
  }

  renderSendCodeForm = () => (
    <React.Fragment>
      <p>
        Please provide your email address and we will send you a verification
        code for sign in.
      </p>
      <Form onSubmit={this.props.sendCode}>
        <div className="auth--input-field">
          <Input
            fluid
            required
            placeholder="Email Address"
            name="email"
            type="email"
            icon="mail"
            iconPosition="left"
            value={this.props.email}
            onChange={(_, { value }) => this.props.changeEmail(value)}
            disabled={this.props.sendCodeStatus === 'REQUEST'}
            action={{
              primary: true,
              content: 'Send Code',
              loading: this.props.sendCodeStatus === 'REQUEST'
            }}
          />
        </div>
      </Form>
      <Header as="h3">Why do I need to sign in?</Header>
      <p style={{ marginTop: '1em' }}>
        After you sign in for the first time we will create a new database for
        you hosted in the cloud. This database will be used to synchronize your
        data among different devices as well as for back up.
      </p>
    </React.Fragment>
  );

  renderVerifyCodeForm = () => (
    <Form onSubmit={this.props.verifyCode}>
      <p>An email with the code has been sent to {this.props.email}</p>
      <div className="auth--input-field">
        <Input
          fluid
          required
          placeholder="Your Code"
          type="number"
          icon="lock"
          iconPosition="left"
          value={this.props.code}
          onChange={(_, { value }) => this.props.changeCode(value)}
          disabled={this.props.verifyCodeStatus === 'REQUEST'}
          action={
            <Button
              primary
              content="Sign In"
              loading={this.props.verifyCodeStatus === 'REQUEST'}
            />
          }
        />
        <Button basic as="a">
          Didn't get the code?
        </Button>
      </div>
    </Form>
  );
}

export default Auth;
