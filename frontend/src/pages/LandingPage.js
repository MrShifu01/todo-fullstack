import { Button, Form } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { resetPage } from "../slices/pageSlice"


const LandingPage = () => {
// State Variables
// Setting a state for the username and password
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Navigate and dispatch assigning
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Use Effect hook to clear local storage of any previous user details and token
  useEffect(() => {
    dispatch(resetPage())
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
  }, []);

  // Function to handle the login process 
  const handleLogin = async(e) => {
    e.preventDefault()

    // creating the userInfo object to send to the login api
    const userInfo = {
      username: username,
      password: password
    }

    try {
      // Post request with the username and passowrd object and the JSON header
      const response = await axios.post('/users/login', userInfo, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      // If a response message, alert the user
      if (response.data.message) {
        alert(response.data.message)
        return
      }

      // Assign the token JWT, to local storage
      localStorage.setItem("userToken", JSON.stringify(response.data))

      // Get users details according the token
      await getUserDetails(response.data)
    } catch (e) {

      // If 403 error, alert user
      if (e.response.data.message) {
        alert(e.response.data.message)

        // Server erro, navigate to error page
      } else {
        navigate('/error')
      }
    }
  }

  // Function for getting a users details
  const getUserDetails = async (userToken) => {

    try {
      // Get request for a users information, this time with a token auth header
      const response = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })

      // Assigning a users details 
      // NOTE: The password is not sent from the server to be stored on local storage
      localStorage.setItem("userData", JSON.stringify(response.data, null, 2))

      // Once a user is logged in, the are taken to the home page
      navigate('/home')
    } catch (e) {

      // 403 error, is alerted to the user
      if (e.response.data.message) {
        alert(e.response.data.message)

        // Server error directs the user to the error page
      } else {
        navigate('/error')
      }
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      {/* Basic form that allows a user to login */}
      <Form.Group className="mb-3">
        <Form.Label>username.</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>password.</Form.Label>
        <Form.Control type="text"value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

{/* Checkbox that is non functional for now */}
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="remember me." />
      </Form.Group>

      <div className="landing-page-buttons">
        
          <Button variant="primary" type="submit">
            sign in.
          </Button>

{/* Link to create a new user page */}
        <LinkContainer to='/createUser'>
          <Button>
            sign up.
          </Button>
        </LinkContainer>
      </div>
    
    </Form>
  )
}

export default LandingPage