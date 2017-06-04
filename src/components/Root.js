import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Welcome from '../Welcome'

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/welcome" component={Welcome} />
    </div>
  </Router>
)

export default Root
