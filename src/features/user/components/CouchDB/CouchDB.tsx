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
            <Input
              fluid required icon="hand point right outline" iconPosition="left"
              placeholder="CouchDB Username"
              name="username" type="text"
              value={this.props.username}
              onChange={(_, { value }) => this.props.saveUsername(value)}
            />
            <Input
              fluid required icon="hand point right outline" iconPosition="left"
              placeholder="CouchDB Password"
              name="username" type="password"
              value={this.props.password}
              onChange={(_, { value }) => this.props.savePassword(value)}
            />
            <Input
              fluid required icon="hand point right outline" iconPosition="left"
              placeholder="CouchDB URL"
              name="url" type="text"
              value={this.props.url}
              onChange={(_, { value }) => this.props.saveURL(value)}
            />
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
