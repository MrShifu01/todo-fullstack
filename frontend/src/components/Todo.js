import { Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import '../assets/styles/index.css'
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { changeEditTodoId, resetEditTodoId } from '../slices/editTodoSlice'
import { useNavigate } from 'react-router-dom';

function Todo({todo, onDelete, onEdit}) {
    // State variables
    // Adding navigation for easy navigation between desired pages
    const navigate = useNavigate()

    // Checked variable for the checkbox of todo items being completed or not
    const [checked, setChecked] = useState(false)

    // Variable for the toggle of the todo item editing
    const [editId, setEditId] = useState(false)

    // Variable for stroring the information of the updated todo
    const [editTodo, setEditTodo] = useState("")

    // Dispatch for changin some global states with redux
    const dispatch = useDispatch()

    // Assigning the variable of the ID of the todo being dedited to toEdit
    const toEdit = useSelector((state) => state.edittodo.id)

    // Retrieving the token from local storage
    const token = JSON.parse(localStorage.getItem("userToken"))

    // Function that handles the deletion of a todo
    const handleDeleteTodo = async (e, id) => {
        e.preventDefault()

        // Try to delete with sent ID and headers
        try {
            await axios.delete(`/todos/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            // If delete was successful, call a function that updates the todo homepage live without a manual refresh
            onDelete(id);
        } catch (e) {

            // If there is a 403 type error, then the message is displayed to the client
            if (e.response.data.message) {
                alert(e.response.data.message)

                // Otherwise, a server error will send a user to the Error page
              } else {
                navigate('/error')
              }
        }
    }

    // A function to handle setting of the local state edit toggle input and then dispatching the ID to the global state
    const handleEditTodo = async (e, id) => {
        e.preventDefault()
        setEditId(prev => !prev)
        dispatch(changeEditTodoId(id))
    }

    // Function to handle the submission of the edited todo item
    const handleSubmitEdit = async (e, toEdit, editTodo) => {
        e.preventDefault()

        // Submitting the edit to the api with the ID and the headers
        try {
            await axios.patch(`/todos/${toEdit}`, { title: editTodo}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            // Calling a function on the homepage that will update live without manual refresh
            onEdit(toEdit, editTodo)

            // reset the variables
            setChecked(false)
            setEditId('')
            dispatch(resetEditTodoId())
        } catch (e) {

            // If 403 error, then an alert is displayed with a message
            if (e.response.data.message) {
                alert(e.response.data.message)

                // Otherwise, navigated to the Error page
              } else {
                navigate('/error')
              }
        }}

    // Function to handle the toggle of an item being completed or not 
    const handleCheckboxToggle = async (id) => {

        // Toggle the local state of checked
        const newChecked = !checked;

        // Assigning the new state
        setChecked(newChecked);
        try {

            // Sending the request to the api with an ID and the updated completed state and the appropriate headers
            await axios.patch(`/todos/completed/${id}`, { completed: newChecked }, {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                }
            });

        } catch (e) {

            // if 403 error, alert client with a message
            if (e.response.data.message) {
                alert(e.response.data.message)

            // If server error, then navigate to the Error page
              } else {
                navigate('/error')
              }
        }
      };

  return (
    <>
    {/* ListGroup of todo items printed out with a checkbox for completed, button icon for editing a todo, and button icon for deletign a todo */}
        <ListGroup>
            <ListGroup.Item variant="dark">
                <div className='todo-item'>
                    <div className='todo-left pt-3'>
                        <Form>
                            {/* Check Box */}
                            <Form.Check
                                className='checkbox'
                                type="switch"
                                id="custom-switch"
                                onChange={() => {
                                    setChecked(prev => !prev)
                                    handleCheckboxToggle(todo._id)
                                }}
                                checked={checked}
                            />
                        </Form>
                        {/* Todo Title */}
                        <h4 className={`todo-title${checked ? 'striked': ""}`}>{todo.title}</h4>
                    </div>
                    <div className='todo-functions'>

                        {/* Edit Button */}
                        <BiEdit
                        className='edit-button mt-3'
                        onClick={(e) => handleEditTodo(e, todo._id)}
                        ></BiEdit>

                        {/* Delete Trash Button */}
                        <FaTrash
                        className='delete-button mt-3'
                        onClick={(e) => handleDeleteTodo(e, todo._id)}
                        ></FaTrash>

                    </div>
                </div>

                {/* If Edit is toggled, then a form appears and an instruction to press enter to submit */}
                {toEdit &&  editId && 
                    <Form onSubmit={(e) => handleSubmitEdit(e, toEdit, editTodo)}>
                        <Form.Group className="mb-3">
                            <Form.Label>edit todo. press enter.</Form.Label>
                            <Form.Control 
                            type="text" 
                            defaultValue={editTodo ? editTodo : todo.title} 
                            onChange={(e) => setEditTodo(e.target.value)}/>
                        </Form.Group>
                    </Form>
                }
            </ListGroup.Item>
        </ListGroup>
    </>
  );
}

export default Todo;