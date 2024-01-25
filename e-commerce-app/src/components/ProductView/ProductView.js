import React, { useState, useEffect } from 'react';

export default function ProductView() {
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

  const AllProducts = () => (
    <div className="container my-3">

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row justify-content-center">
          {products.map(product => (
            <div key={product._id} className="col-md-4 mb-3">
              <ProductDetails product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ProductDetails = ({ product }) => (
    <div className="product-view">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: P{product.price}</p>
    </div>
  );

  return <AllProducts />;
};