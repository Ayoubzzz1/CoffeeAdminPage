import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './view.css'; // We'll create this custom CSS file

function ViewCard() {
  // ... all the existing state and functions remain the same ...
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... keep all the existing useEffect, helper functions, etc. ...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const personResponse = await axios.get(`http://localhost:5000/api/personnel/${id}`);
        if (personResponse.status === 200 && personResponse.data) {
          setPerson(personResponse.data);
        } else {
          setError("Person not found");
        }

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

  const formatDateForComparison = (date) => {
    return date.toISOString().split('T')[0];
  };

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

    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const status = getAttendanceStatus(date);
      if (status === 'green') {
        return 'calendar-tile-present';
      }
      if (status === 'red') {
        return 'calendar-tile-absent';
      }
    }
    return '';
  };

  const calculateTotalSalary = () => {
    if (!person || !attendance.length) return 0;

    let totalSalary = person.total_salary || 0;

    attendance.forEach((record) => {
      if (record.status === 'Absent') {
        totalSalary -= person.salary_per_day;
      }
    });

    return totalSalary;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="view-card-container">
      {/* Personnel Information */}
      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-header">
            <h2>{person.firstName} {person.lastName}</h2>
          </div>
          <div className="profile-details">
            <div className="details-left">
              <div className="detail-item">
                <span className="detail-label">Job Title:</span>
                <span className="detail-value">{person.jobTitle}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{person.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{person.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{person.gender}</span>
              </div>
            </div>
            <div className="profile-image">
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
              
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="calendar-card">
        <h3>Attendance Calendar</h3>
        <Calendar
          tileClassName={tileClassName}
          view="month"
          locale="en-US"
        />
      </div>

      {/* Attendance History */}
      <div className="attendance-card">
        <h3>Attendance History</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
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
                      <span className={`status-badge ${record.status === 'Present' ? 'present' : 'absent'}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>TND{formatCurrency(person.salary_per_day)}</td>
                    <td>TND{formatCurrency(calculateTotalSalary())}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-records">No attendance records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="salary-summary">
          <h3>Salary Information</h3>
          <div className="salary-details">
            <div className="salary-item">
              <span className="salary-label">Total Salary:</span>
              <span className="salary-value">TND {formatCurrency(person.total_salary)}</span>
            </div>
            <div className="salary-item">
              <span className="salary-label">Salary per Day:</span>
              <span className="salary-value">TND {formatCurrency(person.salary_per_day)}</span>
            </div>
            <div className="salary-item">
              <span className="salary-label">Current Salary:</span>
              <span className="salary-value">TND {formatCurrency(calculateTotalSalary())}</span>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default ViewCard;