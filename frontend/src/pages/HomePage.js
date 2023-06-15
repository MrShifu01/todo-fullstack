import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { Row, Col, Container, Form } from 'react-bootstrap'
import Todo from "../components/Todo";
import { changePage } from "../slices/pageSlice";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // State Variables
  // Loading state for when to show the loading spinner
  const [isLoading, setIsLoading] = useState(true);

  // Navigation for the client to navigate seamlessly
  const navigate = useNavigate()

  // Retrieving the JWT from local storage
  const token = JSON.parse(localStorage.getItem("userToken"));

  // Creating an array state for current users todos
  const [todos, setTodos] = useState([]);

  // State to store a new todo item in
  const [newTodo, setNewTodo] = useState('');

  // Dispatch, used for changin global state 
  const dispatch = useDispatch();

  // Use effect hook that loads all the todos of a current user on first load, as well as when dispatch or navigate is called
  useEffect(() => {

    // Change the global page to home page
    dispatch(changePage("home"));

    // Get request to get all users todos
    const getTodos = async (token) => {
      try {
        const response = await axios.get('/todos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Setting the todo array with the todos from the database
        setTodos(response.data);

        // Set loading state to false after data is fetched
        setIsLoading(false);
      } catch (e) {

        // if 403 error, alert the user
        if (e.response.data.message) {
          alert(e.response.data.message)

          // if server error, navigate to error page
        } else {
          navigate('/error')
        }
      }
    };

    // Call the function if a token exists
    if (token) {
      getTodos(token);
    }
  }, [token, dispatch, navigate]);

  // Function to handle the update of the added todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    const todoBody = {
      title: newTodo
    };

    try {
      // Posting the title of a new todo with the right headers JSON and token
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

      // Error 403, alert user
      if (e.response.data.message) {
        alert(e.response.data.message)

        // Server error, navigate to error page
      } else {
        navigate('/error')
      }
    }
  };

  // Function to handle the update of a deleted todo
  const handleDeleteTodo = (id) => {
    // Update the todos state by filtering out the deleted item
    setTodos(todos.filter(todo => todo._id !== id));
  };

  // Function to update the todo array when a todo was edited
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
      {/* Basic form for adding a todo, displaying the array of todo's and handling the loading and empty list */}
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
