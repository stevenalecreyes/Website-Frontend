import React, { useState, useEffect } from 'react';
import { Card, CardGroup } from 'react-bootstrap';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // Handle error (e.g., show a friendly message to the user)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-center my-3">All Products</h2>
      <CardGroup className="justify-content-center mb-3">
        {products.map(product => (
          <Card key={product._id}>
            {/* Product content goes here */}
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              {/* Add more product details as needed */}
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </>
  );
}
