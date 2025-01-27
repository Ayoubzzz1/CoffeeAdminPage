import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, CardSubtitle, CardImg, Row, Col } from 'reactstrap';

function Menushow() {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menuitems');
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data); // Use the data directly since it's already the array of menu items
        } else {
          alert('Failed to load menu items');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the menu items');
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Menu Items</h2>
      <Row>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <Col md="4" className="mb-4" key={item.id}>
              <Card>
                {item.image && (
                  <CardImg
                    top
                    width="100%"
                    src={`data:image/jpeg;base64,${item.image}`} // Assuming image is base64-encoded
                    alt={item.name}
                    className="img-fluid"
                  />
                )}
                <CardBody>
                  <CardTitle tag="h5">{item.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{item.category}</CardSubtitle>
                  <CardText>
                    <strong>Name:</strong> {item.name}
                  </CardText>
                  <CardText>
                    <strong>Category:</strong> {item.category}
                  </CardText>
                  <CardText>
                    <strong>Description:</strong> {item.description}
                  </CardText>
                  <CardText>
                    <strong>Price:</strong> ${item.price}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No menu items found.</p>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Menushow;
