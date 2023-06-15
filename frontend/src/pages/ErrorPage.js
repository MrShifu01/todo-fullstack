import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ErrorPage = () => {
  return (
    <div>
        <h2>there was an error! but dont stress, click 'below.' to go back!</h2>
        {/* <LinkContainer to="/profile"><Button>below.</Button></LinkContainer> */}
    </div>
  )
}

export default ErrorPage