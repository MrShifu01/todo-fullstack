import { Button, Form } from "react-bootstrap"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Loading } from "../components/Loading"

const CreateUserPage = () => {
// State Variables
  const [loading, setLoading] = useState(false)
// Creating a local state object for a new user to be added
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Navigation to all a client to navigate seamlessly
  const navigate = useNavigate()

  // Function to handle teh creation of a new user
  const handleCreateUser = async(e) => {
    e.preventDefault()

    setLoading(true)

    // Checking that a client doesnt leave a field empty during creation of a new user
    if (!newUser.name || !newUser.username || !newUser.email || !newUser.newPassword || !newUser.confirmPassword) {
      alert("please fill in all fields")
      return
    }
    try {

      // Creating a user at the request of the api with the new User information and the header. 
      // NOTE auth header excluded as a new user doesnt have an auth token yet
      const response = await axios.post('/users', newUser, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      // Once a user has been created, call a function to lof the user in immediately to the application
      await loginNewUser(response.data.username, response.data.password)

      // Alert the user that they have been successfully created
      alert(response.data.message)

    } catch (e) {

      // If a 403 error, then alert the user of their instruction
      if (e.response.data.message) {
        alert(e.response.data.message)

        // If server error, then navigate to the error page
      } else {
        navigate('/error')
      }
    }
  }

  // Function to log the new user into their account immediately
  const loginNewUser = async (username, password) => {

    // Extract the username and password from the new user
    const userInfo = {
      username,
      password
    }
    
    try {
      // Call the api to log the user in with the right header and to get token
      const response = await axios.post('/users/login', userInfo, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      // If there is a response message from the server, alert the user
      if (response.data.message) {
        alert(response.data.message)
        return
      }

      // Call a function that retrieves all the information about the new user from the database
      await getUserDetails(response.data)

      // Assign users JWT to local storage, to be able to use the token where needed
      localStorage.setItem("userToken", JSON.stringify(response.data))
    } catch (e) {

      // If a 403 error, alert the user
      if (e.response.data.message) {
        alert(e.response.data.message)

        // If server error, navigate to the Error page
      } else {
        navigate('/error')
      }
    }
  }

  // Function to get the user details, called by the loginNewUser function
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
    setLoading(false)
  }

  return (
    <Form onSubmit={handleCreateUser}>

{/* Back Button if a user doesnt want to create a user, but login */}
        <LinkContainer to='/'>
          <Button className="my-3" variant="light" type="submit">
              go back.
          </Button>
        </LinkContainer>

{/* Form for a client to create a user */}
        <h1>create a new user.</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>name.</Form.Label>
          <Form.Control type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label>username.</Form.Label>
          <Form.Control type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>email.</Form.Label>
          <Form.Control type="text" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <Form.Text className="text-muted">
              must be gmail.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>password.</Form.Label>
          <Form.Control type="text" value={newUser.newPassword} onChange={(e) => setNewUser({ ...newUser, newPassword: e.target.value })} />
            <Form.Text className="text-muted">
              must be 6 or more characters
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>confirm password.</Form.Label>
          <Form.Control type="text" value={newUser.confirmPassword} onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })} />
        </Form.Group>

        <Button variant="primary" type="submit">
        {loading ? (
                    <Loading animation="border" role="status"/>
                  ) : (
                    "create user."
                  )}
            
        </Button>

  </Form>
  )
}

export default CreateUserPage