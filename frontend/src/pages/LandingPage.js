import { Button, Form } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { resetPage } from "../slices/pageSlice"


const LandingPage = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetPage())
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
  }, []);

  const handleLogin = async(e) => {
    e.preventDefault()

    const userInfo = {
      username: username,
      password: password
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
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>username.</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>password.</Form.Label>
        <Form.Control type="text"value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="remember me." />
      </Form.Group>

      <div className="landing-page-buttons">
        
          <Button variant="primary" type="submit">
            sign in.
          </Button>

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