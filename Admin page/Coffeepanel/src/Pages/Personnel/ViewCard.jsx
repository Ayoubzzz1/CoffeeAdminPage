import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Personnel Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {person.firstName} {person.lastName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><strong>Job Title:</strong> {person.jobTitle}</p>
            <p className="mb-2"><strong>Phone:</strong> {person.phone}</p>
            <p className="mb-2"><strong>Age:</strong> {person.age}</p>
            <p className="mb-2"><strong>Gender:</strong> {person.gender}</p>
          </div>
          <div className="flex justify-center md:justify-end">
            {person.image ? (
              <img 
                src={`data:image/jpeg;base64,${person.image}`} 
                alt="Profile" 
                className="w-48 h-48 object-cover rounded-lg shadow"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                No image available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Attendance History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Salary Per Day</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.length > 0 ? (
                attendance.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{formatDate(record.attendance_date)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        record.status === 'Present' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">${formatCurrency(person.salary_per_day)}</td>
                    <td className="px-6 py-4 text-sm">${formatCurrency(person.total_salary)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;
