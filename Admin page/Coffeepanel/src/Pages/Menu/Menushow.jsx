import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg,
  Row,
  Col,
} from "reactstrap";
import "./menushpw.css";

function MenuShow() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menuitems");
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          alert("Failed to load menu items");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching the menu items");
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-container">
      <h2 className="menu-title">Menu Items</h2>
      <div className="menu-grid">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <Card key={item.id} className="menu-card">
              {item.image && (
                <CardImg
                  top
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                  className="menu-card-img"
                />
              )}
              <CardBody className="menu-card-body">
                <CardTitle className="menu-card-title">{item.name}</CardTitle>
                <CardSubtitle className="menu-card-category">
                  {item.category}
                </CardSubtitle>
                <CardText className="menu-card-price">
                  ${item.price}
                </CardText>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
}

export default MenuShow;