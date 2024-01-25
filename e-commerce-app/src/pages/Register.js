import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from "../userContext";
import './Register.css'; // Import your custom styles

export default function Register() {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      mobileNo.length === 11 &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, mobileNo, email, password, confirmPassword]);

  function registerUser(e) {
    e.preventDefault();

    console.log("Registering user with data:", {
      firstName,
      lastName,
      email,
      mobileNo,
      password
    });

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        mobileNo,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFirstName('');
          setLastName('');
          setEmail('');
          setMobileNo('');
          setPassword('');
          setConfirmPassword('');

          alert("Thank you for registering!");
        } else {
          alert("Please try again later");
        }
      });
  }

  return (
    ((user) !== null) ? <Navigate to="/products" /> :
      <Container className="register-container">
        <Row className="justify-content-md-center my-5">
          <Col xs={12} md={6}>
            <Form onSubmit={(e) => registerUser(e)}>
              <h1 className="text-center mb-4">Register</h1>

              <Form.Group controlId="firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e => { setFirstName(e.target.value) }} required />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e => { setLastName(e.target.value) }} required />
              </Form.Group>

              <Form.Group controlId="userEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => { setEmail(e.target.value) }} required />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="mobileNo">
                <Form.Label>Mobile Number:</Form.Label>
                <Form.Control type="text" placeholder="Enter 11 Digit Mobile Number" value={mobileNo} onChange={e => { setMobileNo(e.target.value) }} required />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => { setPassword(e.target.value) }} required />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value) }} required />
              </Form.Group>

              {isActive ? <Button variant="primary" type="submit" id="submitBtn" block>Submit</Button> : <Button variant="primary" disabled block>Submit</Button>}
            </Form>
          </Col>
        </Row>
      </Container>
  );
}
