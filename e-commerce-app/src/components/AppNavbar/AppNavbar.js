import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';

export default function Navbar() {

	const { user } = useContext(UserContext);


	const isAdmin =  user?.isAdmin || false;
	const userId = user?.id;

	return (
		<Navbar bg="light">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">
					{/*add brand name here*/}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={NavLink} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/">
							Products
						</Nav.Link>
						
						{isAdmin && (
							<Nav.Link as={NavLink} to="/">
								Add Product
							</Nav.Link>						
						)}

						{userId ? (
							<>
								{!isAdmin && (
									<>
										<Nav.Link as={NavLink} to="/">
											Profile
										</Nav.Link>
									</>
								)}
								<Nav.Link as={NavLink} to="/">
									Logout
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} to="/">
									Register
								</Nav.Link>
								<Nav.Link as={NavLink} to="/">
									Login
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>				
	);
}