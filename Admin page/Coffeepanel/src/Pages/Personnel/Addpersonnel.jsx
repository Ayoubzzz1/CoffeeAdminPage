import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AddPersonnel() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    phone: '',
    age: '',
    gender: '',
    image: null,
    dateAdded: '',
    salaryTotal: '',    // Added new field
    salaryPerDay: ''    // Added new field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate salary fields
    if (!formData.salaryTotal || formData.salaryTotal <= 0) {
      toast.error('Please enter a valid total salary');
      return;
    }
    if (!formData.salaryPerDay || formData.salaryPerDay <= 0) {
      toast.error('Please enter a valid salary per day');
      return;
    }

    const currentDate = new Date().toISOString();
    setFormData({ ...formData, dateAdded: currentDate });

    try {
      const imageBase64 = await convertImageToBase64(formData.image);

      const formDataToSend = {
        ...formData,
        image: imageBase64,
        total_salary: Number(formData.salaryTotal),
        salary_per_day: Number(formData.salaryPerDay)
      };

      const response = await axios.post('http://localhost:5000/api/personnel', formDataToSend);
      console.log('Personnel added successfully', response.data);

      // Clear the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        jobTitle: '',
        phone: '',
        age: '',
        gender: '',
        image: null,
        dateAdded: '',
        salaryTotal: '',
        salaryPerDay: ''
      });

      toast.success('Personnel added successfully!');
    } catch (error) {
      console.error('Error adding personnel', error);
      toast.error('Failed to add personnel!');
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container mt-5">
      <h2>Add Personnel</h2>
      <form onSubmit={handleSubmit}>
        {/* Existing form fields */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Added new salary fields */}
        <div className="mb-3">
          <label htmlFor="salaryTotal" className="form-label">Salary Total:</label>
          <input
            type="number"
            className="form-control"
            id="salaryTotal"
            name="salaryTotal"
            value={formData.salaryTotal}
            onChange={handleChange}
            placeholder="Enter total salary"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="salaryPerDay" className="form-label">Salary Per Day:</label>
          <input
            type="number"
            className="form-control"
            id="salaryPerDay"
            name="salaryPerDay"
            value={formData.salaryPerDay}
            onChange={handleChange}
            placeholder="Enter salary per day"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <Toaster />
    </div>
  );
}

export default AddPersonnel;