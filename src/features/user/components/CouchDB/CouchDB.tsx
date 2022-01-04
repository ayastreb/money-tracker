import React from 'react';
import { Divider, Form, Header, Input } from 'semantic-ui-react';
import { Link, Redirect, RouteProps } from 'react-router-dom';
import { saveUsername, savePassword, saveURL } from '../../state/ui/CouchDB.action';
import { finishCouchDBSetting } from 'features/user/state/ui/CouchDB.action'
import './index.css';

export interface CouchDBPropsT {
  isSignedIn: boolean;
  username: string;
  password: string;
  url: string;
  saveUsername: typeof saveUsername;
  savePassword: typeof savePassword;
  saveURL: typeof saveURL;
  finishCouchDBSetting: typeof finishCouchDBSetting;
};

class CouchDB extends React.Component<CouchDBPropsT & RouteProps, {}> {
  render() {
    if (this.props.isSignedIn) return <Redirect to="/" />;

    return (
      <div className="container-raised-desktop">
        <Header as="h2" icon="id card outline" content="CouchDB setup" />
        <Divider />
        <p>Setup CouchDB.</p>
        <Form onSubmit={this.props.finishCouchDBSetting}>
          <div className="couchdb--input-field">
            <Form.Field>
              <label>CouchDB Username</label>
              <Input
                fluid required icon="user" iconPosition="left"
                placeholder="Username"
                name="username" type="text"
                value={this.props.username}
                onChange={(_, { value }) => this.props.saveUsername(value)}
              />
            </Form.Field>
            <Form.Field>
            <label>CouchDB password</label>
              <Input
                fluid required icon="protect" iconPosition="left"
                placeholder="Password"
                name="password" type="password"
                value={this.props.password}
                onChange={(_, { value }) => this.props.savePassword(value)}
              />
            </Form.Field>
            <Form.Field>
              <label>CouchDB URL</label>
              <Input
                fluid required icon='linkify' iconPosition='left'
                placeholder='URL, e.g. http://127.0.0.1:5984'
                name='url' type='text'
                value={this.props.url}
                onChange={(_, { value }) => this.props.saveURL(value)}
              />
            </Form.Field>
            <button className="ui primary button" type="submit">Submit</button>
          </div>
        </Form>
        <Divider />
        <p>
          <Link to="/">Back</Link>
        </p>
      </div>
    );
  }
}

export default CouchDB;
