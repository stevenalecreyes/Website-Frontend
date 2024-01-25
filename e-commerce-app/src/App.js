import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar/AppNavbar';
import { UserProvider } from './userContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Logout from './pages/Logout';
import Register from './pages/Register';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin:null
});

  //const [loading, setLoading] = useState(true);

  const unsetUser = () => {
      localStorage.clear();
  }

  useEffect(() => {
  // Check if a token exists in localStorage
  const token = localStorage.getItem('token');

  if (token) {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data._id) {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  } else {
    // Handle the case where there is no token (user not logged in)
    setUser({
      id: null,
      isAdmin: null
    });
  }
}, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar/>
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
