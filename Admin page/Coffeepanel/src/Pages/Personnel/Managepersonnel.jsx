import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { useNavigate } from 'react-router-dom'; // Correct import for react-router-dom v6

function ManagePersonnel() {
  const [personnelData, setPersonnelData] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Fetch personnel data from the Flask API
  useEffect(() => {
    fetch('http://localhost:5000/api/personnel') // Make sure to use the correct URL
      .then((response) => response.json())
      .then((data) => setPersonnelData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const handleDelete = (id) => {
    // Confirm delete action
    const confirmed = window.confirm("Are you sure you want to delete this person?");
    if (confirmed) {
      // Call API to delete the personnel by using the id
      fetch(`http://localhost:5000/api/personnel/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Update the UI by removing the person from the state
            setPersonnelData(personnelData.filter((person) => person.id !== id));
            alert("Personnel deleted successfully!");
          } else {
            alert("Failed to delete the person. Please try again.");
          }
        })
        .catch((error) => console.error("Error deleting personnel:", error));
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Personnel Management</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Image</th>
            <th>Action</th> {/* Added Action Column */}
          </tr>
        </thead>
        <tbody>
  {personnelData.map((person) => (
    <tr key={person.id}>
      <td>{person.firstName} {person.lastName}</td>
      <td>{person.jobTitle}</td>
      <td>{person.phone}</td>
      <td>{person.age}</td>
      <td>{person.gender}</td>
      <td>
        {person.image ? (
          <img
            src={`data:image/png;base64,${person.image}`}
            alt={`${person.firstName} ${person.lastName}`}
            width="100"
            className="img-fluid"
          />
        ) : (
          'No image available'
        )}
      </td>
      <td>
        {/* Update Button */}
        <button 
          className="btn btn-success me-2"
          onClick={() => handleUpdate(person.id)} // Pass person ID for update
        >
          Update
        </button>

        {/* Delete Button */}
        <button 
          className="btn btn-danger"
          onClick={() => handleDelete(person.id)} // Pass person ID for delete
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
