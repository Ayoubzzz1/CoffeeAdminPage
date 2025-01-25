import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams to get the ID from the URL

function ViewCard() {
  const { id } = useParams();  // Get the ID from the URL
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track errors

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/personnell/${id}`);
        if (response.status === 200 && response.data) {
          setPerson(response.data);  // Set person data if successful
        } else {
          setError("Person not found");
        }
      } catch (error) {
        console.error('Error fetching person data:', error);
        setError("Failed to load person data");
      } finally {
        setLoading(false);  // Set loading to false after the fetch completes
      }
    };
    
    fetchPersonData();
  }, [id]);  // Re-fetch data if the ID changes

  if (loading) return <div>Loading...</div>;  // Show loading while data is being fetched

  if (error) return <div>{error}</div>;  // Show error message if an error occurred

  return (
    <div className="container mt-5">
      <h2>{person.firstName} {person.lastName}</h2>
      <p><strong>Job Title:</strong> {person.jobTitle}</p>
      <p><strong>Phone:</strong> {person.phone}</p>
      <p><strong>Age:</strong> {person.age}</p>
      <p><strong>Gender:</strong> {person.gender}</p>

      {person.image ? (
        <img 
          src={`data:image/jpeg;base64,${person.image}`} 
          alt="Profile" 
          style={{ width: '200px' }} 
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

export default ViewCard;
