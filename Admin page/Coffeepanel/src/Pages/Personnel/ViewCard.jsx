import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ViewCard() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch person data
        const personResponse = await axios.get(`http://localhost:5000/api/personnel/${id}`);
        if (personResponse.status === 200 && personResponse.data) {
          setPerson(personResponse.data);
        } else {
          setError("Person not found");
        }

        // Fetch attendance data
        const attendanceResponse = await axios.get(`http://localhost:5000/api/attendance/${id}`);
        if (attendanceResponse.status === 200) {
          setAttendance(attendanceResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.error || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return Number(amount).toFixed(2);
  };

  // Helper function to format the date without time for comparison
  const formatDateForComparison = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  // Create a map for attendance status
  const getAttendanceStatus = (date) => {
    const formattedDate = formatDateForComparison(date);
    const attendanceRecord = attendance.find((record) => {
      const recordDate = new Date(record.attendance_date);
      const formattedRecordDate = formatDateForComparison(recordDate);
      return formattedRecordDate === formattedDate;
    });

    if (attendanceRecord) {
      return attendanceRecord.status === 'Present' ? 'green' : 'red';
    }

    return null; // No record for that day
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const status = getAttendanceStatus(date);
      if (status === 'green') {
        return 'bg-success text-white'; // green background for present
      }
      if (status === 'red') {
        return 'bg-danger text-white'; // red background for absent
      }
    }
    return '';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="fs-3">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="fs-3 text-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Personnel Information */}
      <div className="card mb-5">
        <div className="card-body">
          <h2 className="card-title">{person.firstName} {person.lastName}</h2>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Job Title:</strong> {person.jobTitle}</p>
              <p><strong>Phone:</strong> {person.phone}</p>
              <p><strong>Age:</strong> {person.age}</p>
              <p><strong>Gender:</strong> {person.gender}</p>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
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
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="card mb-5">
        <div className="card-body">
          <h3 className="card-title">Attendance Calendar</h3>
          <Calendar
            tileClassName={tileClassName}
            view="month"
            locale="en-US"
          />
        </div>
      </div>

      {/* Attendance History */}
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Attendance History</h3>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr className="table-secondary">
                  <th>Date</th>
                  <th>Status</th>
                  <th>Salary Per Day</th>
                  <th>Total Salary</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((record, index) => (
                    <tr key={index}>
                      <td>{formatDate(record.attendance_date)}</td>
                      <td>
                        <span className={`badge ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>${formatCurrency(person.salary_per_day)}</td>
                      <td>${formatCurrency(person.total_salary)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">No attendance records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;
