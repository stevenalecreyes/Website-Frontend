import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../userContext';
import Swal from 'sweetalert2';

export default function Login() {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (email !== "" && password !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password])

	function authenticate(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
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
						text: "Welcome to Zuitt!"
					});
				} else {
					Swal.fire({
						title: "Authentication failed",
						icon: "error",
						text: "Check your login details and try again."
					});
				}
			})
			.catch(error => {
				console.error('Error during login:', error);
				Swal.fire({
					title: "An unexpected error occured",
					icon: "error",
					text: "Please try again later."
				});
			});

		setEmail('');
		setPassword('');
	}

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
				console.error('Error retrieving user details:', error)
			});
	}

	return (
		(user && user.id !== null) ? <Navigate to ="/products" />
		:
		<Form onSubmit={(e) => authenticate(e)}>
			<h1 className="my-5 text-center">Login</h1>
			<Form.Group controlId="userEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
			</Form.Group>

			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
			</Form.Group>

			{isActive ? <Button variant="primary" type="submit" id="submitBtn">Submit</Button> : <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>}
		</Form>
		)
}