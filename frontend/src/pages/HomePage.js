import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { Row, Col, Container, Form } from 'react-bootstrap'
import Todo from "../components/Todo";
import { changePage } from "../slices/pageSlice";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem("userToken"));
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage("home"));
    const getTodos = async (token) => {
      try {
        const response = await axios.get('/todos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTodos(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message)
        } else {
          navigate('/error')
        }
      }
    };

    if (token) {
      getTodos(token);
    }
  }, [token, dispatch]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const todoBody = {
      title: newTodo
    };

    try {
      const response = await axios.post('/todos', todoBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      // Update the todos state with the newly added todo
      setTodos([...todos, response.data.item]);

      // Clear the newTodo input field
      setNewTodo('');
    } catch (e) {
      if (e.response.data.message) {
        alert(e.response.data.message)
      } else {
        navigate('/error')
      }
    }
  };

  const handleDeleteTodo = (id) => {
    // Update the todos state by filtering out the deleted item
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleEditTodo = (id, editTodo) => {
    // Find the index of the edited todo in the todos array
    const index = todos.findIndex(todo => todo._id === id);

    // Create a copy of the todo at the specified index
    const updatedTodo = { ...todos[index] };

    // Update the properties of the copied todo (e.g., title, completed, etc.)
    // For example, if you have an "editTodo" state that stores the edited title:
    updatedTodo.title = editTodo;

    // Create a new array of todos with the updated todo
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;

    // Update the todos state with the new array
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <h1 className="text-center my-1">todos.</h1>
      <Row>
        <Col></Col>
        <Col className="col-6">
          <Form onSubmit={handleAddTodo}>
            <Form.Group className="mb-3">
              <Form.Label>add todo. press enter.</Form.Label>
              <Form.Control type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            </Form.Group>
          </Form>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              <Loading />
            </div>
          ) : (
            todos.length !== 0 ? todos.map((todo) => (
              <div key={todo._id}>
                <Todo todo={todo} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
              </div>
            )) : <p style={{opacity: "0.5"}}>you have no todos todo.</p>
          )}
        </Col>
        <Col className="col-3"></Col>
      </Row>
    </Container>
  );
};

export default HomePage;
