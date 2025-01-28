import React, { useState, useEffect } from 'react';

function Personneldate() {
  const [salaryTotal, setSalaryTotal] = useState('');
  const [salaryPerDay, setSalaryPerDay] = useState('');
  const [attendance, setAttendance] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [personnelList, setPersonnelList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/personnel');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPersonnelList(data);
      } catch (error) {
        console.error('Error fetching personnel list:', error);
        setError('Failed to load personnel list');
      }
    };

    fetchPersonnel();
  }, []);

  const handleAttendanceChange = (e) => {
    setAttendance(e.target.value);
  };

  const validateInputs = () => {
    if (!selectedName) return 'Please select a personnel name';
    if (!selectedDate) return 'Please select a date';
    if (!attendance) return 'Please select attendance status';
   
    return null;
  };

  const handleSaveStatus = async () => {
    try {
      // Clear previous error
      setError('');

      // Validate inputs
      const validationError = validateInputs();
      if (validationError) {
        setError(validationError);
        return;
      }

      const data = {
        personnel_name: selectedName.trim(),
        attendance_date: selectedDate,
        status: attendance,
     
      };

      console.log('Sending data:', data); // Debug log

      const response = await fetch('http://localhost:5000/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save attendance record');
      }

      alert('Attendance record saved successfully!');
      
      // Clear form
      setSelectedName('');
      setSelectedDate('');
      setAttendance('');
      
      
    } catch (error) {
      console.error('Error saving attendance:', error);
      setError(error.message || 'An error occurred while saving attendance');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Personnel Attendance</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Personnel Name:</label>
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="form-select"
        >
          <option value="">Select Personnel</option>
          {personnelList.map((person) => (
            <option 
              key={person.id} 
              value={`${person.firstName} ${person.lastName}`.trim()}
            >
              {`${person.firstName} ${person.lastName}`.trim()}
            </option>
          ))}
        </select>
      </div>


      <div className="mb-3">
        <label className="form-label">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <span className="form-label d-block">Attendance:</span>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="present"
            name="attendance"
            value="Present"
            checked={attendance === 'Present'}
            onChange={handleAttendanceChange}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="present">Present</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="absent"
            name="attendance"
            value="Absent"
            checked={attendance === 'Absent'}
            onChange={handleAttendanceChange}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="absent">Absent</label>
        </div>
      </div>

      <button
        onClick={handleSaveStatus}
        className="btn btn-primary w-100"
        disabled={!!validateInputs()}
      >
        Save Status
      </button>
    </div>
  );
}

export default Personneldate;