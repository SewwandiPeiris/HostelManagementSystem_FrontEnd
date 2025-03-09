import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import SideBar from "../../Components/SideBar";
import Tool from "../../Components/Tool";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './Student.css';
import { getAllProspectiveStudent } from "../../Service/adminService.js";

const Student = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudentId] = useState(null);
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

  const handleViewStudent = (studentId) => {
    console.log(`Viewing details for student ID: ${studentId}`);
    setSelectedStudentId(studentId);
    setModalShow(true); // ✅ Open modal when View is clicked
  };


  return (
    <>
      <Tool />
      <SideBar />

      <div className="student-container">
        <h1 className="student-title">Prospective Students Details</h1>

        <div className="student-header">
          <Form.Control className="custom-input6" type="text" placeholder="Salary below (Rs) " />
          <Form.Control className="custom-input6" type="text" placeholder="Distance more than (km)" />
          <Form.Select className="custom-input5" size="sm">
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
          <button className="add-select-student" onClick={handleSelectStudent}>
            View Select Students
          </button>
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Student Number</th>
              <th>Full Name</th>
              <th>Faculty Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Distance(km)</th>
              <th>Annual Salary(Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.studentId}</td>
                  <td>{student.firstName + " " + student.lastName}</td>
                  <td>{student.facultyName}</td>
                  <td>{student.contactNumber}</td>
                  <td>{student.email}</td>
                  <td>{student.distanceToHome}</td>
                  <td>{student.annualSalary}</td>
                  <td>
                    <button className="action-btn view-btn" onClick={() => handleViewStudent(student)}></button>
                    <button className="action-btn delete-btn"></button>
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
          <Modal.Title className="custom-modal1">Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal2">
          {selectedStudent && (
            <>
              <p className="pp"><strong>Student ID: </strong>{selectedStudent.studentId}</p>
              <p className="pp"><strong>National ID: </strong> {selectedStudent.nationalId}</p>
              <p className="pp"><strong>Gender: </strong> {selectedStudent.gender}</p>
              <p className="pp"><strong>Address: </strong>{selectedStudent.street + ", " + selectedStudent.village + ", " + selectedStudent.district + ", " + selectedStudent.province + ", " + selectedStudent.postalCode}</p>
              <p className="pp"><strong>Main Income: </strong> {selectedStudent.mainIncome}</p>
              <p className="pp"><strong>Additional Income: </strong> {selectedStudent.additionalIncome}</p>
              <p className="pp"><strong>No of Family Members: </strong> {selectedStudent.numberFamilyMembers}</p>
              <p className="pp"><strong>No of Sibilings: </strong> {selectedStudent.numberOfSiblings}</p>
              <p className="pp"><strong>No of Sibilings who still study: </strong> {selectedStudent.numberOfSiblingsEdu}</p>
              <p className="pp"><strong>Name of Gardian: </strong> {selectedStudent.nameOfGuardian}</p>
              <p className="pp"><strong>Contact No of Gardian: </strong> {selectedStudent.guardianContactNumber}</p>
  
              <Form.Select className="custom-input7" size="sm" defaultValue="">
                <option value="" disabled hidden>
                  Select the Hostel
                </option>
                <option value="Bulugaha">Bulugaha</option>
                <option value="Kannangara">Kannangara</option>
                <option value="Mahara">Mahara</option>
              </Form.Select>
              <Form.Select className="custom-input7" size="sm" defaultValue="">
                <option value="" disabled hidden>
                  Select the Room ID
                </option>
                <option value="Bulugaha">Bulugaha</option>
                <option value="Kannangara">Kannangara</option>
                <option value="Mahara">Mahara</option>
              </Form.Select>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="custom-modal3">
          <Button variant="primary" className="custom-button6" >Eligeble</Button>
          <Button variant="danger" className="custom-button7">Not Eligeble</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Student;
