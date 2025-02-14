import React, { useState, useEffect } from 'react';
import { Coffee, Utensils, CheckCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menulist.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items and categories from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menuitems');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMenuItems();
    fetchCategories();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="custom-menu-page">
      <div className="custom-menu-hero">
        <div className="custom-hero-overlay">
          <div className="container text-center">
            <h1>Our Menu</h1>
            <p>Delicious coffee and bites at Café Camorra</p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="custom-menu-list">
              <h2>Menu Items</h2>
              <div className="row g-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="col-md-6">
                    <div className="custom-menu-item">
                      <div className="custom-menu-icon">
                        {/* Display the corresponding icon for each category */}
                        {item.category === 'coffee' ? <Coffee /> : <Utensils />}
                      </div>
                      <div>
                        <h4>{item.name} <span className="custom-price">{item.price}</span></h4>
                        <p>{item.description}</p>
                        <p><strong>Category: </strong>{item.category}</p> {/* Display the category */}
                        {item.image && (
                          <div>
                            <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} className="img-fluid" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="custom-menu-sidebar">
              <div className="custom-info-card">
                <h3>Why Choose Us?</h3>
                <div className="custom-info-content">
                  <p><CheckCircle className="custom-icon" /> Freshly Brewed Coffee</p>
                  <p><CheckCircle className="custom-icon" /> Handcrafted Pastries</p>
                  <p><CheckCircle className="custom-icon" /> Cozy Atmosphere</p>
                </div>
                <div className="custom-policy-info mt-4">
                  <h4>Special Offers</h4>
                  <ul>
                    <li>Buy 1 Get 1 Free on Mondays</li>
                    <li>Happy Hour: 2-4 PM, 20% Off</li>
                    <li>Free WiFi for all customers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
