import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { useNavigate } from 'react-router-dom'; // Correct import for react-router-dom v6
import axios from 'axios'; // Import axios

function ManagePersonnel() {
  const [personnelData, setPersonnelData] = useState([]);
  const [editPerson, setEditPerson] = useState(null); // For managing edit form state
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

  const handleUpdate = (id) => {
    // Find the person you want to edit
    const personToEdit = personnelData.find((person) => person.id === id);
    setEditPerson(personToEdit); // Set the person data into the state for editing
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    
    if (editPerson) {
      // Prepare the data to be updated
      const updatedPerson = {
        ...editPerson,
        // You can add other fields to update here, for example, if the user modifies name, job title, etc.
      };

      // Update the personnel data using axios PUT
      axios
        .put(`http://localhost:5000/api/personnel/${editPerson.id}`, updatedPerson)
        .then((response) => {
          if (response.status === 200) {
            // Update state with the new data
            const updatedPersonnelData = personnelData.map((person) =>
              person.id === editPerson.id ? updatedPerson : person
            );
            setPersonnelData(updatedPersonnelData);
            setEditPerson(null); // Clear the edit form
            alert("Personnel updated successfully!");
          }
        })
        .catch((error) => {
          console.error("Error updating personnel:", error);
          alert("Failed to update personnel. Please try again.");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPerson((prevEditPerson) => ({
      ...prevEditPerson,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Personnel Management</h2>

      {/* Personnel Table */}
      <table className="table table-striped table-bordered mt-4">
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

      {/* Modal for Edit Personnel */}
      {editPerson && (
  <div
    className="modal fade show"
    style={{
      display: 'block',
      paddingTop: '2%', // Adjust the top padding to position the modal 20% from the top
    }}
    id="editModal"
    tabIndex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="editModalLabel">Edit Personnel</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setEditPerson(null)}
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmitUpdate}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={editPerson.firstName || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={editPerson.lastName || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                name="jobTitle"
                value={editPerson.jobTitle || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={editPerson.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={editPerson.age || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-control"
                name="gender"
                value={editPerson.gender || ''}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Personnel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default ManagePersonnel;
