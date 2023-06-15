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
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
    const [editId, setEditId] = useState(false)
    const [editTodo, setEditTodo] = useState("")
    const dispatch = useDispatch()

    const toEdit = useSelector((state) => state.edittodo.id)

    const token = JSON.parse(localStorage.getItem("userToken"))

    const handleDeleteTodo = async (e, id) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`/todos/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            onDelete(id);
            console.log(response.data.message)
        } catch (e) {
            if (e.response.data.message) {
                alert(e.response.data.message)
              } else {
                navigate('/error')
              }
        }
    }

    const handleEditTodo = async (e, id) => {
        e.preventDefault()
        setEditId(prev => !prev)
        dispatch(changeEditTodoId(id))
    }

    const handleSubmitEdit = async (e, toEdit, editTodo) => {
        e.preventDefault()

        try {
            await axios.patch(`/todos/${toEdit}`, { title: editTodo}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            onEdit(toEdit, editTodo)
            setChecked(false)
            setEditId('')
            dispatch(resetEditTodoId())
        } catch (e) {
            if (e.response.data.message) {
                alert(e.response.data.message)
              } else {
                navigate('/error')
              }
        }}

    const handleCheckboxToggle = async (id) => {
        const newChecked = !checked;
        setChecked(newChecked);
        try {
            const response = await axios.patch(`/todos/completed/${id}`, { completed: newChecked }, {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.message);
        } catch (e) {
            if (e.response.data.message) {
                alert(e.response.data.message)
              } else {
                navigate('/error')
              }
        }
      };

  return (
    <>
        <ListGroup>
            <ListGroup.Item variant="dark">
                <div className='todo-item'>
                    <div className='todo-left pt-3'>
                        <Form>
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
                        <h4 className={`todo-title${checked ? 'striked': ""}`}>{todo.title}</h4>
                    </div>
                    <div className='todo-functions'>

                        <BiEdit
                        className='edit-button mt-3'
                        onClick={(e) => handleEditTodo(e, todo._id)}
                        ></BiEdit>
                        <FaTrash
                        className='delete-button mt-3'
                        onClick={(e) => handleDeleteTodo(e, todo._id)}
                        ></FaTrash>

                    </div>
                </div>
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