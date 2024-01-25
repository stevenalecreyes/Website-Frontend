import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../userContext';
import Swal from 'sweetalert2';

import './Login.css';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsActive(email !== "" && password !== "");
  }, [email, password]);

  const authenticate = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          retrieveUserDetails(data.token);
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome!"
          });
        } else {
          setError("Authentication failed. Check your login details and try again.");
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setError("An unexpected error occurred. Please try again later.");
      });

    setEmail('');
    setPassword('');
  };

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
      })
      .catch(error => {
        console.error('Error retrieving user details:', error);
      });
  };

  return (
    (user && user.id !== null) ? <Navigate to="/products" /> :
      <Container className="login-container">
        <Row className="justify-content-md-center my-5">
          <Col xs={12} md={6}>
            <Form onSubmit={authenticate}>
              <h1 className="text-center mb-4">Login</h1>

              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

              <Form.Group controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {isActive ?
                <Button variant="primary" type="submit" id="submitBtn" block>
                  Submit
                </Button> :
                <Button variant="danger" type="submit" id="submitBtn" disabled block>
                  Submit
                </Button>
              }
            </Form>
          </Col>
        </Row>
      </Container>
  );
}
