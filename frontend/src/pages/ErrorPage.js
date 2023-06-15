import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Error page for when there is a server error and the user can see a simple message and not a red screen
const ErrorPage = () => {
  return (
    <div>
        <h2>there was an error! but dont stress, we are working on the problem. try again soon!</h2>
        {/* Back button takes a user back to the login screen */}
        <LinkContainer to='/'>
          <Button>
            go back.
          </Button>
        </LinkContainer>
    </div>
  )
}

export default ErrorPage