import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PersonnelCard() {
  const [personnel, setPersonnel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonnelData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/personnel');
        setPersonnel(response.data);
      } catch (error) {
        console.error('Error fetching personnel data', error);
      }
    };
    fetchPersonnelData();
  }, []);

  const handleCardClick = (id) => {
    if (id) {
      navigate(`/personnel/view/${id}`);
    } else {
      console.error("Invalid ID");
    }
  };

  // const handleShowMoreClick = (e, id) => {
  //   e.stopPropagation();  // Prevent the card click from being triggered
  //   if (id) {
  //     navigate(`/personnel/View/${id}`);
  //   } else {
  //     console.error("Invalid ID");
  //   }
  // };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Personnel List</h2>
      <div className="row">
        {personnel.map((person) => (
          <div className="col-md-4 mb-4" key={person.id}>
            <div
              className="card person-card"
              style={{
                width: '18rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onClick={() => handleCardClick(person.id)}  // Click on the card to navigate
            >
          <img
  src={person.image ? `data:image/jpeg;base64,${person.image}` : "https://via.placeholder.com/150"}
  className="card-img-top"
  alt="Profile"
  style={{
    transition: 'transform 0.3s ease',
    objectFit: 'cover',
    height: '200px',
  }}
/>

              <div className="card-body">
                <h5 className="card-title">{person.firstName} {person.lastName}</h5>
                <p className="card-text">{person.jobTitle}</p>
                <button 
                  className="btn btn-primary"
                  onClick={(e) => handleShowMoreClick(e, person.id)}  // Pass ID and prevent card click
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonnelCard;
