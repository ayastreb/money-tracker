import React from 'react'
import { Grid } from 'semantic-ui-react'
import Header from '../components/Header'
import NetWorth from './NetWorth'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header label="Dashboard" />
        <div className="container-full-page">
          <Grid>
            <Grid.Row>
              <Grid.Column computer={5} mobile={16}>
                <NetWorth />
                <div className="placeholder" style={{ height: '250px' }}>
                  Account List
                </div>
              </Grid.Column>
              <Grid.Column computer={11} mobile={16}>
                <div className="placeholder" style={{ height: '250px' }}>
                  New Transaction
                </div>
                <div className="placeholder" style={{ height: '500px' }}>
                  Transaction List
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Dashboard
