import { Button, Form } from "react-bootstrap"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const CreateUserPage = () => {

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    newPassword: "",
    confirmPassword: ""
  })
  const navigate = useNavigate()

  const handleCreateUser = async(e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.username || !newUser.email || !newUser.newPassword || !newUser.confirmPassword) {
      alert("please fill in all fields")
      return
    }
    try {
      const response = await axios.post('/users', newUser, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      loginNewUser(response.data.username, response.data.password)
      alert(response.data.message)

    } catch (e) {
      if (e.response.data.message) {
        alert(e.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  const loginNewUser = async (username, password) => {

    const userInfo = {
      username,
      password
    }
    
    try {
      const response = await axios.post('/users/login', userInfo, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.data.message) {
        alert(response.data.message)
        return
      }
      getUserDetails(response.data)
      localStorage.setItem("userToken", JSON.stringify(response.data))
    } catch (e) {
      if (e.response.data.message) {
        alert(e.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  const getUserDetails = async (userToken) => {

    try {
      const response = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      localStorage.setItem("userData", JSON.stringify(response.data, null, 2))
      navigate('/home')
    } catch (e) {
      if (e.response.data.message) {
        alert(e.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  return (
    <Form onSubmit={handleCreateUser}>

        <LinkContainer to='/'>
          <Button className="my-3" variant="light" type="submit">
              go back.
          </Button>
        </LinkContainer>

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
            create user.
        </Button>

  </Form>
  )
}

export default CreateUserPage