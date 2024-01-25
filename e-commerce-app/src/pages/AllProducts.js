// AllProducts.js
import React, { useState, useEffect } from 'react';
import ProductView from './ProductView'; // Adjust the import path based on your project structure

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-3">
      <h2 className="text-center my-3">All Products</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row justify-content-center">
          {products.map(product => (
            <div key={product._id} className="col-md-4 mb-3">
              <ProductView product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
