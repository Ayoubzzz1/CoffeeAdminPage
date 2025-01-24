import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ManagePersonnel() {
  const [personnelData, setPersonnelData] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchPersonnelData = async () => {
      try {
        const response = await fetch('/api/personnel');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPersonnelData(data);
      } catch (error) {
        setError(`Error fetching personnel data: ${error.message}`);
        console.error('Error fetching personnel data:', error);
      }
    };
    
    
    fetchPersonnelData();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Personnel</h2>
      {error && <div className="alert alert-danger">Error: {error}</div>} {/* Show error message */}
      <table className="table table-striped table-hover table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Image</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnelData.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.jobTitle}</td>
              <td>
                {person.image ? (
                  <img
                    src={`data:image/jpeg;base64,${person.image}`}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{ width: '50px', height: '50px' }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{person.phone}</td>
              <td>{person.age}</td>
              <td>{person.gender}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleUpdate(index)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagePersonnel;
