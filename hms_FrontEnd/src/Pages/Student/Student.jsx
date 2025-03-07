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

  const handleSelectStudent = () => {
    // Add logic for selecting a student (e.g., open a modal, navigate to another page)
    console.log("Select Student button clicked");
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
            placeholder="Filter by Distance"
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Filter by Annual_Salary"
            className="filter-input"
          />
          <button 
            className="add-select-student" 
            onClick={handleSelectStudent} // Added onClick event
          >
            Select Student
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
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="no-data">
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
