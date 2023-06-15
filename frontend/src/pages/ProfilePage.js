import { Button, Form, Modal } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { changePage } from '../slices/pageSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../components/Loading';

const ProfilePage = () => {
    const [loading, setLoading] = useState(false)
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

    // Dealing with teh Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const handleUpdateSubmit = async (e, user, id, name, username, email) => {
      e.preventDefault()

      setLoading(true)

      const userInfo = {
        name,
        username,
        email,
        currentUser: user
      }

      console.log(userInfo)
      if (!userInfo.name || !userInfo.username || !userInfo.email) {
        alert("please fill in all fields")
        return
      }

      try {
        const response = await axios.patch(`/users/${id}`, userInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        const updateUser = {...user[0], name, username, email}
        localStorage.setItem('userData', JSON.stringify(updateUser))
        alert(response.data.message)
        setUpdateUser(false)
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message)
        } else {
          navigate('/error')
        }
      }
      setLoading(false)
    }

    const handleUpdatePassword = async (e, id, newPassword, confirmPassword) => {
      e.preventDefault()
      setLoading(true)
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
        if (e.response.data.message) {
          alert(e.response.data.message)
        } else {
          navigate('/error')
        }
      }
      setLoading(false)
    }

  
  return (
    <div>
        {user.map((info) => (
            <div key={info._id}>
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
                <Form onSubmit={(e) => handleUpdateSubmit(e, user, info._id, updateInfo.name !== "" ? updateInfo.name : info.name, updateInfo.username !== "" ? updateInfo.username : info.username, updateInfo.email !== "" ? updateInfo.email : info.email)}>
                  <Button variant="light" type="submit" onClick={() => { setUpdateUser(false); setUpdatePassword(false); }}>
                    go back.
                  </Button>
                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>name.</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={updateInfo.name ? updateInfo.name : info.name}
                      onChange={(e) => setUpdateinfo({ ...updateInfo, name: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>username.</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={updateInfo.username ? updateInfo.username : info.username}
                      onChange={(e) => setUpdateinfo({ ...updateInfo, username: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>email.</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={updateInfo.email ? updateInfo.email : info.email}
                      onChange={(e) => setUpdateinfo({ ...updateInfo, email: e.target.value })}
                    />
                  </Form.Group>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loading animation="border" role="status"/>
                    ) : (
                      "update user info."
                    )}
                  </Button>
                </Form>

              }

              {updatePassword && 
                <Form>

                  <Button variant="light" type="submit"
                    onClick={() => {
                      setUpdateUser(false)
                      setUpdatePassword(false)
                    }}
                    >
                        go back.
                  </Button>

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
                  type='submit'
                  disabled={loading}
                  onClick={(e) => handleUpdatePassword(e, info._id, updatePasswordInfo.newPassword, updatePasswordInfo.confirmPassword)}
                  >
                  {loading ? (
                    <Loading animation="border" role="status"/>
                  ) : (
                    "set new password."
                  )}</Button>

                </Form>
              }

              {!updateUser && !updatePassword &&
                <div className='profile-buttons'>
                  <Button
                  onClick={() => setUpdateUser(prev => !prev)}
                  >edit user details.</Button>
                  
                  <Button
                  onClick={() => setUpdatePassword(prev => !prev)}
                  >change password.</Button>

                  <Button variant="primary" 
                  onClick={handleShow}
                  >delete user.</Button>


                </div>}

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>confirm delete user?</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      cancel.
                    </Button>
                    <Button
                    onClick={(e) => handleDeleteUser(e, info._id)}
                    >delete user.</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        ))}
    </div>
  )
}

export default ProfilePage