import React from 'react'
import AccountForm from '../InitialSetup/AccountForm'

const Details = ({ match }) => (
  <div className="container-raised-desktop">
    Details - {match.params.id}
    <AccountForm />
  </div>
)

export default Details
