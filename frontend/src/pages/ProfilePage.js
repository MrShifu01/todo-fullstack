import { Button, Form, Modal } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { changePage } from '../slices/pageSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../components/Loading';

const ProfilePage = () => {
  // State variables
  // Loading State
    const [loading, setLoading] = useState(false)

    // Toggles to show different renders on screen
    const [updateUser, setUpdateUser] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)

    // Update Password details state
    const [updatePasswordInfo, setUpdatePasswordInfo] = useState({})

    // Update user info details state
    const [updateInfo, setUpdateinfo] = useState({
      name: "",
      username: "",
      email: ""
    })

    // Retrieve the token and the users details
    const user = [JSON.parse(localStorage.getItem('userData'))]
    const token = [JSON.parse(localStorage.getItem('userToken'))]

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    // Use Effect top change the current page
    useEffect(() => {
      dispatch(changePage("profile"))
    }, [dispatch])

    // Dealing with the Delete Modal and states to ask a user if they are sure they want to delete
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function for handling the deletion of a users profile
    const handleDeleteUser = async (e, id) => {
      e.preventDefault()

      // Delete request
      const response = await axios.delete(`/users/${id}`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      })

      // Alert them the user was deleted and navigate back to landing/login page
      alert(response.data.message)
      navigate('/')
    }

    // Function to handle the update a user details form
    const handleUpdateSubmit = async (e, user, id, name, username, email) => {
      e.preventDefault()

      // Loading spinner is a user waits for the detaisl to be updated
      setLoading(true)

      // Update information, including currentUser, for the purpose of validating or excluding validation of username and password cross check
      const userInfo = {
        name,
        username,
        email,
        currentUser: user
      }

      // If a user does not fill in required fields, alert them
      if (!userInfo.name || !userInfo.username || !userInfo.email) {
        alert("please fill in all fields")
        return
      }

      try {

        // Patch request to api for updating details with the correct headers
        const response = await axios.patch(`/users/${id}`, userInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        // Setting updateUser information to allow the new info to be displayed immediately 
        const updatedUser = {...user[0], name, username, email}

        // Assigning the update details to local storage
        localStorage.setItem('userData', JSON.stringify(updatedUser))

        // Alert the user of success in updating
        alert(response.data.message)

        // Toggle the update state back to show normal profile page
        setUpdateUser(false)
      } catch (e) {

        // If 403 error, alert the user with instructions
        if (e.response.data.message) {
          alert(e.response.data.message)

          // If server error, go to error page
        } else {
          navigate('/error')
        }
      }
      // Once information is retrieved, loading state ends
      setLoading(false)
    }

    // Function to handle the changing of a password
    const handleUpdatePassword = async (e, id, newPassword, confirmPassword) => {
      e.preventDefault()

      // Set loading state to true
      setLoading(true)
      try {

        // Patch request with the new and confirm passwords and headers
        const response = await axios.patch(`/users/changePassword/${id}`, { newPassword, confirmPassword }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        // If password update a success, the alert the user and reload the page
        alert(response.data.message)
        window.location.reload()
      } catch (e) {

        // If 403 error, alert user of instruction
        if (e.response.data.message) {
          alert(e.response.data.message)

          // Server error, load error page
        } else {
          navigate('/error')
        }
      }

      // Set loading state to false after alert displayed
      setLoading(false)
    }

  
  return (
    <div>
      {/* Loading all the current users information */}
        {user.map((info) => (
            <div key={info._id}>

              {/* Display information if the update and password change toggles are false */}
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

              {/* If update toggle is true, show the update information form */}
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
                        onKeyDownCapture={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateSubmit(e, user, info._id, updateInfo.name !== "" ? updateInfo.name : info.name, updateInfo.username !== "" ? updateInfo.username : info.username, updateInfo.email !== "" ? updateInfo.email : info.email);
                          }
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUserName">
                      <Form.Label>username.</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={updateInfo.username ? updateInfo.username : info.username}
                        onChange={(e) => setUpdateinfo({ ...updateInfo, username: e.target.value })}
                        onKeyDownCapture={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateSubmit(e, user, info._id, updateInfo.name !== "" ? updateInfo.name : info.name, updateInfo.username !== "" ? updateInfo.username : info.username, updateInfo.email !== "" ? updateInfo.email : info.email);
                          }
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUserName">
                      <Form.Label>email.</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={updateInfo.email ? updateInfo.email : info.email}
                        onChange={(e) => setUpdateinfo({ ...updateInfo, email: e.target.value })}
                        onKeyDownCapture={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateSubmit(e, user, info._id, updateInfo.name !== "" ? updateInfo.name : info.name, updateInfo.username !== "" ? updateInfo.username : info.username, updateInfo.email !== "" ? updateInfo.email : info.email);
                          }
                        }}
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

              {/* If update password toggle is true, show the update password form */}
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

                  <Form.Group className="mb-3" controlId="formNewPassword">
                    <Form.Label>new password.</Form.Label>
                    <Form.Control 
                    type="text"
                    onChange={(e) => setUpdatePasswordInfo({ ...updatePasswordInfo, newPassword: e.target.value })} 
                    onKeyDownCapture={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdatePassword(e, info._id, updatePasswordInfo.newPassword, updatePasswordInfo.confirmPassword);
                      }
                    }}
                    />
                    <Form.Text>must be longer than 6 characters.</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>confirm password.</Form.Label>
                    <Form.Control 
                    type="text" 
                    onChange={(e) => setUpdatePasswordInfo({ ...updatePasswordInfo, confirmPassword: e.target.value })} 
                    onKeyDownCapture={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdatePassword(e, info._id, updatePasswordInfo.newPassword, updatePasswordInfo.confirmPassword);
                      }
                    }}
                    />
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

              {/* Buttons to be displayed when update and password toggles are off */}
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

              {/* Model to be shown after a user tries to delete a user, this is just to make sure they want to delete */}
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