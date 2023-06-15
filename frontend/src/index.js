import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import LandingPage from './pages/LandingPage';
import CreateUserPage from './pages/CreateUserPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<LandingPage/>} />
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/createUser' element={<CreateUserPage/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/error' element={<ErrorPage/>} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
