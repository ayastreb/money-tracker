import React from 'react'
import { Card, Container } from 'semantic-ui-react'
import Stepper from './containers/Stepper'
import ActiveStep from './containers/ActiveStep'

const Welcome = () => {
  return (
    <Container text>
      <Card raised fluid>
        <Card.Content>
          <Stepper />
          <ActiveStep />
        </Card.Content>
      </Card>
    </Container>
  )
}

export default Welcome
