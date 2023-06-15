import { Button, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { changePage } from '../slices/pageSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../components/Loading';

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const [updateUser, setUpdateUser] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)
    const [updatePasswordInfo, setUpdatePasswordInfo] = useState({})
    const [updateInfo, setUpdateinfo] = useState({
      name: "",
      username: "",
      email: ""
    })

    const user = [JSON.parse(localStorage.getItem('userData'))]
    const token = [JSON.parse(localStorage.getItem('userToken'))]

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    useEffect(() => {
      dispatch(changePage("profile"))
    }, [])

    const handleDeleteUser = async (e, id) => {
      e.preventDefault()
      const response = await axios.delete(`/users/${id}`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      })
      alert(response.data.message)
      navigate('/')
    }

    const handleUpdateUser = (e, id) => {
      setUpdateUser(prev => !prev)
    }

    const handleUpdateSubmit = async (e, id, name, username, email) => {
      e.preventDefault()
      const userInfo = {
        name,
        username,
        email
      }

      const response = await axios.patch(`/users/${id}`, userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const updateUser = {...user[0], name, username, email}
      localStorage.setItem('userData', JSON.stringify(updateUser))
      setUpdateUser(false)
    }

    const handleUpdatePassword = async (e, id, newPassword, confirmPassword) => {
      e.preventDefault()
      try {
        const response = await axios.patch(`/users/changePassword/${id}`, { newPassword, confirmPassword }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        alert(response.data.message)
        window.location.reload()
      } catch (e) {
        alert(e.response.data.message)
      }
    }

  
  return (
    <div>
        {user.map((info) => (
            <>
              {!updateUser && !updatePassword && 
                <ListGroup key={info._id}>
                    <ListGroup.Item>
                      <div className='profile-item'>
                        <strong>name:</strong>
                        {info.name}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className='profile-item'>
                        <strong>username:</strong>
                        {info.username}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className='profile-item'>
                        <strong>email:</strong>
                        {info.email}
                      </div>
                    </ListGroup.Item>
                </ListGroup>}

              {updateUser && 
                <Form>

                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>name.</Form.Label>
                    <Form.Control 
                    type="text" 
                    defaultValue={updateInfo.name ? updateInfo.name : info.name}
                    onChange={(e) => setUpdateinfo({ ...updateInfo, name: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>username.</Form.Label>
                    <Form.Control 
                    type="text" 
                    defaultValue={updateInfo.username ? updateInfo.username : info.username}
                    onChange={(e) => setUpdateinfo({ ...updateInfo, username: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>email.</Form.Label>
                    <Form.Control 
                    type="text" 
                    defaultValue={updateInfo.email ? updateInfo.email : info.email}
                    onChange={(e) => setUpdateinfo({ ...updateInfo, email: e.target.value })} />
                  </Form.Group>

                  <Button
                  onClick={(e) => handleUpdateSubmit(
                    e, 
                    info._id,
                    updateInfo.name !== "" ? updateInfo.name : info.name, 
                    updateInfo.username !== "" ? updateInfo.username : info.username, 
                    updateInfo.email !== "" ? updateInfo.email : info.email
                    )}
                  >Update User Info</Button>

                </Form>
              }

              {updatePassword && 
                <Form>

                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>new password.</Form.Label>
                    <Form.Control 
                    type="text"
                    onChange={(e) => setUpdatePasswordInfo({ ...updatePasswordInfo, newPassword: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>confirm password.</Form.Label>
                    <Form.Control 
                    type="text" 
                    onChange={(e) => setUpdatePasswordInfo({ ...updatePasswordInfo, confirmPassword: e.target.value })} />
                  </Form.Group>

                  <Button
                  onClick={(e) => handleUpdatePassword(e, info._id, updatePasswordInfo.newPassword, updatePasswordInfo.confirmPassword)}
                  >Set New Password</Button>

                </Form>
              }

              {!updateUser && !updatePassword &&
                <div className='profile-buttons'>
                  <Button
                  onClick={(e) => handleUpdateUser(e, info._id)}
                  >Edit User Details</Button>
                  
                  <Button
                  onClick={() => setUpdatePassword(prev => !prev)}
                  >Change Password</Button>

                  <Button
                  onClick={(e) => handleDeleteUser(e, info._id)}
                  >Delete User</Button>
                </div>}
            </>
        ))}
    </div>
  )
}

export default ProfilePage