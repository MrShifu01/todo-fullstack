import { Button, Form } from "react-bootstrap"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const CreateUserPage = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleCreateUser = async(e) => {
    e.preventDefault()
    console.log(newUser)
    const response = await axios.post('/users', newUser)

    loginNewUser(response.data.username, response.data.password)
    alert(response.data.message)
  }

  const loginNewUser = async (username, password) => {

    const userInfo = {
      username,
      password
    }
    
    try {
      const response = await axios.post('/users/login', userInfo)
      if (response.data.message) {
        alert(response.data.message)
        return
      }
      getUserDetails(response.data)
      localStorage.setItem("userToken", JSON.stringify(response.data))
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  const getUserDetails = async (userToken) => {

    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
    localStorage.setItem("userData", JSON.stringify(response.data, null, 2))
    navigate('/home')
  }

  return (
    <Form onSubmit={handleCreateUser}>
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>password.</Form.Label>
          <Form.Control type="text" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <Form.Text className="text-muted">
              must be 6 or more characters
            </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
            create user.
        </Button>

  </Form>
  )
}

export default CreateUserPage