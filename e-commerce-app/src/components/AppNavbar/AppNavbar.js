import React from 'react';
import Container from 'react-bootstrap/Container'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../userContext';
import './AppNavbar.css'

export default function AppNavbar() {

	const { user } = useContext(UserContext);

	const userId = user?.id;

	return (
		<Navbar bg="light" expand="lg" className='Navbar' style={{ border: "1px solid black" }}>
			<Navbar.Brand as={Link} to="/" className="brand">
					GameHaven
				</Navbar.Brand>
			<Container fluid>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto nav-menu">
						<Nav.Link as={NavLink} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/products">
              					Products
           				</Nav.Link>
      
            			{userId ? (
                  			<Nav.Link as={NavLink} to="/logout">
                    			Logout
                  			</Nav.Link>
  
            			) : (
            			<>
                			<Nav.Link as={NavLink} to="/login">
                  				Login
                			</Nav.Link>

                			<Nav.Link as={NavLink} to="/register">
                  				Register
                			</Nav.Link>
                		</>
                		)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>				
	);
}