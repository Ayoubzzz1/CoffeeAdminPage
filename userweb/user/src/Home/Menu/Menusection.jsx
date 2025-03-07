import React, { useState, useEffect } from 'react';
import './menusec.css';

const Menusection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menuitems');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Slice the menuItems array to get only the first 8 items
  const displayedMenuItems = menuItems.slice(0, 8);

  return (
    <div className="menu-wrapper">
      <div className="menu-title">
        <h3>Our Menu</h3>
        <h1>Explore Our Coffee Collection</h1>
        <div className="title-underline"></div>
      </div>

      <div className="menu-container">
        <div className="menu-grid">
          {displayedMenuItems.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-image-container">
                <img 
                  src={`data:image/jpeg;base64,${product.image}`} 
                  alt={product.name} 
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h5>{product.name}</h5>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price} TND</span>
                  <button className="learn-more-btn">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menusection;
