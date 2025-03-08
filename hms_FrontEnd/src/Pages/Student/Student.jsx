import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import Tool from "../../Components/Tool";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Student.css";
import { getAllProspectiveStudent } from "../../Service/adminService.js";

const Student = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const tokan = sessionStorage.getItem("token");

    getAllProspectiveStudent(tokan)
        .then((res) => {
          console.log(res.data.content);
          setStudents(res.data.content); // ✅ Store API data
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
  }, []);

  const handleSelectStudent = () => {
    navigate('/select_student'); // ✅ Navigates to Select Student page
  };


  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setModalShow(true);
  };

  return (
      <>
        <SideBar />
        <Tool />
        <div className="student-container">
          <h1 className="student-title">Students Details</h1>

          <div className="student-header">
            <input type="text" placeholder="Filter by Distance" className="filter-input" />
            <input type="text" placeholder="Filter by Annual Salary" className="filter-input" />
            <input type="text" placeholder="Filter by Number of family member" className="filter-input" />
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
            {students.length > 0 ? (
                students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.nameWithInitials}</td>
                      <td>{student.firstName+" "+student.lastName}</td>
                      <td>{student.facultyName}</td>
                      <td>{student.contactNumber}</td>
                      <td>{student.email}</td>
                      <td>
                        <button className="action-btn view-btn" onClick={() => handleViewStudent(student)}>View</button>
                        <button className="action-btn delete-btn">Delete</button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="7" className="no-data">No data available</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* Modal for Viewing Student Details */}
        <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Student Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStudent && (
                <>
                  <p><strong>Student ID:</strong> {selectedStudent.studentId}</p>
                  <p><strong>Name:</strong> {selectedStudent.firstName + " "+ selectedStudent.lastName}</p>
                  <p><strong>Email:</strong> {selectedStudent.email}</p>
                  <p><strong>Faculty:</strong> {selectedStudent.facultyName}</p>
                  <p><strong>Contact:</strong> {selectedStudent.contactNumber}</p>
                </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
  );
};

export default Student;
