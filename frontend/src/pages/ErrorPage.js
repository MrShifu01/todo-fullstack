import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const ErrorPage = () => {
  return (
    <div>
        <h2>there was an error! but dont stress, we are working on the problem. try again soon!</h2>
        <LinkContainer to='/'>
          <Button>
            go back.
          </Button>
        </LinkContainer>
    </div>
  )
}

export default ErrorPage