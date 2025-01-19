import React, { useState } from 'react';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Student.css';

const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log(isModalOpen);  // Debugging line to ensure toggling
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <SideBar />
      <Tool />
      <div className="student-container">
        <h1 className="student-title">Students Details</h1>

        <div className="student-header">
          <input type="text" placeholder="Filter by Room ID" className="filter-input" />
          <button className="export-button">Export as PDF</button>
          <button className="add-student-button" onClick={toggleModal}>
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

      {isModalOpen && (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
          <div className="modal">
            <h3>Add Student</h3>
            <form>
              <div>
                <label>Student ID:</label>
                <input type="text" name="studentId" required />
              </div>
              <div>
                <label>Name with Initials:</label>
                <input type="text" name="nameWithInitials" required />
              </div>
              <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" required />
              </div>
              <div>
                <label>Faculty Name:</label>
                <input type="text" name="facultyName" required />
              </div>
              <div>
                <label>Contact:</label>
                <input type="text" name="contact" required />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" name="email" required />
              </div>
              <div>
                <label>Hostel ID:</label>
                <input type="text" name="hostelId" required />
              </div>
              <div>
                <label>Room ID:</label>
                <input type="text" name="roomId" required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Student;

