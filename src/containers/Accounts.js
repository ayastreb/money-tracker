import React from 'react'
import Header from '../components/Header/index'
import { Icon, Segment } from 'semantic-ui-react'

class Accounts extends React.Component {
  render() {
    return (
      <div>
        <Header label="Accounts" />
        <Segment basic padded textAlign="center">
          <Icon name="hourglass half" size="massive"/>
          <h3>Work in progress</h3>
        </Segment>
      </div>
    )
  }
}

export default Accounts
