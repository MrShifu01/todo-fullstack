# Todo App with User Authentication

This is a simple todo application with user authentication built using Express, React, and Create React App.

## Features

- User Registration: Users can create an account by providing a unique username and password.
- User Login: Registered users can log in to access their todo lists.
- Todo Creation: Authenticated users can create new todo items.
- Todo Listing: Users can view their todo items in a list.
- Todo Updating: Users can update the status (completed/incomplete) of their todo items.
- Todo Deletion: Users can delete their todo items.

## Technologies Used

- Express: A backend framework for handling API requests and authentication.
- React: A frontend library for building the user interface.
- Create React App: A tool for setting up a React project with a preconfigured development environment.
- MongoDB: A NoSQL database for storing user and todo data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB, used for database operations.
- JSON Web Tokens (JWT): A method for securely transmitting information between parties as a JSON object.

## Installation

1. Clone the repository:


git clone https://github.com/MrShifu01/todo-fullstack


2. Navigate to the root directory and install dependencies:

```
npm install
```

3. Populate the database

```
npm run data:import
```

4. Start the server:

```
npm run server
```

5. Open another terminal window and navigate to the client directory:

```
cd frontend
npm install
```

6. Start the client:

```
npm run client
```

7. Open your browser and access the application at `http://localhost:3000`.

## Usage

- Register a new user account using the provided registration form.
- Log in to access your todo list.
- Create new todo items by entering a task and hitting ENTER
- Mark todo items as completed by checking the corresponding checkbox.
- Delete todo items by clicking the "Delete" button.
- Edit todo items by clicking the "Edit" button.

## Contributing

Contributions are welcome! If you have any suggestions or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```