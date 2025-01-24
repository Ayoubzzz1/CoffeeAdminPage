import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PersonnelCard() {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    // Fetch all personnel data from the API when the component mounts
    const fetchPersonnelData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/personnel'); // Adjust the API endpoint as needed
        const data = response.data;

        // Update state with the personnel data
        setPersonnel(data);
      } catch (error) {
        console.error('Error fetching personnel data', error);
      }
    };

    fetchPersonnelData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Personnel List</h2>
      <div className="row">
        {personnel.map((person, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={{ width: '18rem' }}>
              {/* Display the image, or a placeholder if it's not available */}
              <img
                src={person.image ? `data:image/jpeg;base64,${person.image}` : "https://via.placeholder.com/150"}
                className="card-img-top"
                alt="Profile"
              />
              <div className="card-body">
                <h5 className="card-title">{person.firstName} {person.lastName}</h5>
                <p className="card-text">{person.jobTitle}</p>
                <a href="#" className="btn btn-primary">Show More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonnelCard;
