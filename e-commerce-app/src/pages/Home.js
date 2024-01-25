import React from "react";
import { Container, Alert } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar/AppNavbar";

export default function Home({ error }) {
  return (
    <div>
      <Container>
          <h2>Welcome to the Home Page</h2>
    
          {error && (
              <Alert variant="danger">
                Error: {error.message}
              </Alert>
          )}

        <p>This is a simple home page for your application.</p>
      </Container>
    </div>
  );
}
