import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ManagePersonnel() {
  const personnelData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Software Engineer',
      image: 'https://via.placeholder.com/50',
      phone: '123-456-7890',
      age: 30,
      gender: 'Male',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      jobTitle: 'Product Manager',
      image: 'https://via.placeholder.com/50',
      phone: '987-654-3210',
      age: 28,
      gender: 'Female',
    },
    // Add more personnel data as needed
  ];

  const handleUpdate = (index) => {
    alert(`Updating personnel at index ${index}`);
    // Add update logic here (e.g., open a modal or navigate to a new page)
  };

  const handleDelete = (index) => {
    alert(`Deleting personnel at index ${index}`);
    // Add delete logic here (e.g., remove from the array or make an API call)
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Personnel</h2>
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
                <img
                  src={person.image}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                />
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
