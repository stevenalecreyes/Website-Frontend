import React from 'react';
import ProductView from '../components/ProductView/ProductView';
import './Products.css'; // Import your custom styles

export default function Products() {
  return (
    <div className="container product-container">
      <h1 className="product-header">Explore Our Products</h1>
      <div className="product-list">
        <ProductView />
        {/* Add more ProductView components or map through your products data */}
      </div>
    </div>
  );
};
