import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import {
  Header,
  Divider,
  Form,
  Button,
  Input,
  Message,
  Loader
} from 'semantic-ui-react'
import './index.css'

class Auth extends React.Component {
  componentDidMount() {
    if (this.props.location.hash) {
      this.props.finishAuth(this.props.location.hash)
    }
  }

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />
    if (this.props.location.hash)
      return (
        <Loader
          active
          content="Synchronizing data, this might take a moment..."
        />
      )

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
        {!this.props.isCodeSent
          ? this.renderSendCodeForm()
          : this.renderVerifyCodeForm()}
        <Divider />
        <p>
          <Link to="/">Back</Link>
        </p>
      </div>
    )
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
            icon="mail outline"
            iconPosition="left"
            value={this.props.email}
            onChange={this.handleChange(this.props.changeEmail)}
            disabled={this.props.isSendingCode}
            action={{
              primary: true,
              content: 'Send Code',
              loading: this.props.isSendingCode
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
  )

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
          onChange={this.handleChange(this.props.changeCode)}
          disabled={this.props.isVerifyingCode}
          action={
            <Button
              primary
              content="Sign In"
              loading={this.props.isVerifyingCode}
            />
          }
        />
        <Button basic as="a">
          Didn't get the code?
        </Button>
      </div>
    </Form>
  )

  handleChange = handler => (event, { value }) => handler(value)
}

Auth.propTypes = {
  isAuthenticated: PropTypes.bool,
  isSendingCode: PropTypes.bool,
  isCodeSent: PropTypes.bool,
  isVerifyingCode: PropTypes.bool,
  isCodeValid: PropTypes.bool,
  error: PropTypes.string,
  email: PropTypes.string,
  code: PropTypes.string,
  changeEmail: PropTypes.func,
  changeCode: PropTypes.func,
  sendCode: PropTypes.func,
  verifyCode: PropTypes.func,
  finishAuth: PropTypes.func
}

export default Auth
