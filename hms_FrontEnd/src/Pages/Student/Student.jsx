import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Student.css';

const Student = () => {
  const navigate = useNavigate();

  const navigateToAddStudent = () => {
    navigate('/add_student'); // Update with the correct route for AddStudent page
  };

  return (
    <>
      <SideBar />
      <Tool />
      <div className="student-container">
        <h1 className="student-title">Students Details</h1>

        <div className="student-header">
          <input
            type="text"
            placeholder="Filter by Room ID"
            className="filter-input"
          />
          <button className="export-button">Export as PDF</button>
          <button
            className="add-student-button"
            onClick={navigateToAddStudent}
          >
            Add Student
          </button>
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name with Initials</th>
              <th>Full Name</th>
              <th>Faculty Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Hostel ID</th>
              <th>Room ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="no-data">
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Student;
