import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import SideBar from "../../Components/SideBar";
import Tool from "../../Components/Tool";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../Student/Student.css';

const SelectStudent = () => {
    const navigate = useNavigate();
    console.log("hjjhbv")
      const [modalShow, setModalShow] = useState(false);
      console.log("festred")
      const [selectedStudent, setSelectedStudentId] = useState(null);
      console.log("qaewzrdx")
      const [students, setStudents] = useState([]);
    

    // Function to navigate back to the Student page
    const handleBack = () => {
        navigate('/student'); // Replace '/student' with the correct route of your Student page
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
                <h1 className="student-title">Eligible Students</h1>
                <div className="student-header">
                    <Form.Select className="custom-input5" size="sm">
                        <option value="" disabled>Select the Hostel</option>
                        <option value="Bulugaha">All Hostels</option>
                        <option value="Mahara">Mahara</option>
                    </Form.Select>
                    <Form.Select className="custom-input5" size="sm">
                        <option value="" disabled>Select the Hostel</option>
                        <option value="Bulugaha">All Hostels</option>
                        <option value="Mahara">Mahara</option>
                    </Form.Select>

                    <button className="add-select-student" onClick={handleBack}>
                        Go to Prospective students Details
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
                            <th>Hostel</th>
                            <th>Room ID</th>
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
                                    <td>{student.hostel_id}</td>
                                    {/* <td>{student.RoomId}</td> */}
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
                            <p className="pp"><strong>Distance To Home: </strong> {selectedStudent.distanceToHome}</p>
                            <p className="pp"><strong>Main Income: </strong> {selectedStudent.mainIncome}</p>
                            <p className="pp"><strong>Additional Income: </strong> {selectedStudent.additionalIncome}</p>
                            <p className="pp"><strong>Annual Salary: </strong> {selectedStudent.annualSalary}</p>
                            <p className="pp"><strong>No of Family Members: </strong> {selectedStudent.numberFamilyMembers}</p>
                            <p className="pp"><strong>No of Sibilings: </strong> {selectedStudent.numberOfSiblings}</p>
                            <p className="pp"><strong>No of Sibilings who still study: </strong> {selectedStudent.numberOfSiblingsEdu}</p>
                            <p className="pp"><strong>Name of Gardian: </strong> {selectedStudent.nameOfGuardian}</p>
                            <p className="pp"><strong>Contact No of Gardian: </strong> {selectedStudent.guardianContactNumber}</p>

                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="custom-modal3"> 
                </Modal.Footer>
            </Modal>
          
        </>
        
     
        
    );
};

export default SelectStudent;
