import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Home.css"; // Import your custom styles

export default function Home({ error }) {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to the GameHaven</h1>
      </header>

      {error && (
        <div className="error-alert">
          <p>Error: {error.message}</p>
        </div>
      )}

      <Container>
        <section>
          <h2>Explore the Latest Games</h2>
          <p>
            Dive into the world of gaming with our vast collection of the
            latest and greatest video games. From action-packed adventures to
            immersive RPGs, we have it all.
          </p>
          <Button as={Link} to="/products" variant="outline-primary">
            View Products
          </Button>
        </section>
      </Container>
    </div>
  );
}
