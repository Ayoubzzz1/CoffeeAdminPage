import React from 'react';
import './Menusec.css';

const Menusection = () => {
  const productsLeft = [
    { name: 'Espresso', price: '$3.00', image: '/images/espresso.png', description: 'Rich and bold classic espresso shot' },
    { name: 'Latte', price: '$4.50', image: '/images/latte.png', description: 'Smooth espresso with steamed milk' },
    { name: 'Cappuccino', price: '$4.00', image: '/images/cappuccino.png', description: 'Perfect balance of espresso, steamed milk, and foam' },
    { name: 'Americano', price: '$3.50', image: '/images/americano.png', description: 'Espresso diluted with hot water' },
  ];

  const productsRight = [
    { name: 'Mocha', price: '$5.00', image: '/images/mocha.png', description: 'Espresso with chocolate and steamed milk' },
    { name: 'Macchiato', price: '$4.80', image: '/images/macchiato.png', description: 'Espresso marked with a dash of foamed milk' },
    { name: 'Cold Brew', price: '$4.00', image: '/images/coldbrew.png', description: 'Smooth, cold-steeped coffee' },
    { name: 'Flat White', price: '$4.50', image: '/images/flatwhite.png', description: 'Espresso with velvety steamed milk' },
  ];

  return (
    <div className="menu-wrapper">
      <div className="menu-title">
        <h3>Our Menu</h3>
        <h1>Explore Our Coffee Collection</h1>
        <div className="title-underline"></div>
      </div>

      <div className="menu-container">
        <div className="menu-grid">
          {/* Left Column */}
          <div className="menu-column">
            {productsLeft.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button className="learn-more-btn">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="menu-column">
            {productsRight.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button className="learn-more-btn">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menusection;