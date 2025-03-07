import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Student.css';

const Student = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const navigateToAddStudent = () => {
    navigate('/add_student'); // ✅ Navigates to Add Student page
  };

  const handleSelectStudent = () => {
    navigate('/select_student'); // ✅ Navigates to Select Student page
  };

  const handleViewStudent = (studentId) => {
    console.log(`Viewing details for student ID: ${studentId}`);
    setSelectedStudentId(studentId);
    setModalShow(true); // ✅ Open modal when View is clicked
  };

  const handleDeleteStudent = (studentId) => {
    console.log(`Deleting student ID: ${studentId}`);
    alert(`Student ID ${studentId} has been deleted.`);
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
            placeholder="Filter by Annual Salary"
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Filter by Number of family member"
            className="filter-input"
          />
          <button className="add-select-student" onClick={handleSelectStudent}>
            View Select Students
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample student row, replace with dynamic data */}
            <tr>
              <td>1001</td>
              <td>J. Doe</td>
              <td>John Doe</td>
              <td>Science</td>
              <td>+94 771234567</td>
              <td>johndoe@example.com</td>
              <td>
                <button
                  className="action-btn view-btn"
                  onClick={() => handleViewStudent(1001)}
                >
                  View
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteStudent(1001)}
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="7" className="no-data">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ Modal for Viewing Student Details */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Student ID:</strong> {selectedStudentId}</p>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Faculty:</strong> Science</p>
          <p><strong>Contact:</strong> +94 771234567</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Student;
