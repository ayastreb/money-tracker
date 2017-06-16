import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic, Grid } from 'semantic-ui-react'
import Header from '../components/Header'
import Amount from '../components/Amount'
import { getNetWorth } from '../selectors/accounts'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header label="Dashboard" />
        <div className="container-full-page">
          <Grid>
            <Grid.Row>
              <Grid.Column computer={5} mobile={16}>
                <div className="placeholder" height={100}>
                  <Statistic size="mini">
                    <Statistic.Label>Net Worth</Statistic.Label>
                    <Statistic.Value>
                      <Amount
                        value={this.props.netWorth}
                        code={this.props.baseCurrency}
                      />
                    </Statistic.Value>
                  </Statistic>
                </div>
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

Dashboard.propTypes = {
  baseCurrency: PropTypes.string,
  netWorth: PropTypes.number
}

const mapStateToProps = state => ({
  baseCurrency: state.settings.currency.base,
  netWorth: getNetWorth(state)
})

export default connect(mapStateToProps)(Dashboard)
