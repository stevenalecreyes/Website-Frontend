import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../userContext';
import './AppNavbar.css'

export default function AppNavbar() {

	const { user } = useContext(UserContext);


	const isAdmin =  user?.isAdmin || false;
	const userId = user?.id;

	return (
		<Navbar bg="light" expand="lg" className='Navbar' style={{ border: "1px solid black" }}>
			<Container fluid>
				<Navbar.Brand as={Link} to="/">
					My E Commerce App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto nav-menu">
						<Nav.Link as={NavLink} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/products/all">
              				Products
            			</Nav.Link>
            			<Nav.Link as={NavLink} to="/login">
							Login
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>				
	);
}