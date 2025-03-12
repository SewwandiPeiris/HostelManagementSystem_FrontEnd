import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import SideBar from "../../Components/SideBar";
import Tool from "../../Components/Tool";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../Student/Student.css';
import {
    deleteEligibleStudent,
    getAllEligibleStudent, getAllEligibleStudentByFilter,
    getAllHostel,
    getAllProspectiveStudent, getAllProspectiveStudentByFilter,
    getRoomByHostelId, updateStudentStatus
} from "../../Service/adminService.js";
import Swal from "sweetalert2";

const SelectStudent = () => {
    const navigate = useNavigate();

      const [modalShow, setModalShow] = useState(false);
      const [selectedStudent, setSelectedStudentId] = useState(null);
      const [students, setStudents] = useState([]);
      const [hostels, setHostels] = useState([]);
      const [rooms, setRooms] = useState([]);
      const [selectedHostelId, setSelectedHostelId] = useState("");
      const [selectedRoomId, setSelectedRoomId] = useState("");



    useEffect(() => {
        const token = sessionStorage.getItem("token");

        lodeStudentTable(token);
        getAllHostel(token)
            .then((res)=>{
                setHostels(res.data.content)
                console.log(res.data.content)
            })

    }, []);


    useEffect(() => {
        if (selectedHostelId) {
            const token = sessionStorage.getItem("token");
            getRoomByHostelId(selectedHostelId,token).then((res)=>{
                if(res.data.status_code=== 3){
                    Swal.fire({
                        icon: "error",
                        title: "OOPS..!",
                        text: "No Rooms in this Hostel",
                    });
                    setRooms([]);
                    return;
                }
                setRooms(res.data.content);
            })
        }
    }, [selectedHostelId]);

    const lodeStudentTable=()=>{
        const token = sessionStorage.getItem("token");
        getAllEligibleStudent(token)
            .then((res) => {
                console.log(res.data.content);
                setStudents(res.data.content); // ✅ Store API data
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
            });
    };
    

    // Function to navigate back to the Student page
    const handleBack = () => {
        navigate('/student'); // Replace '/student' with the correct route of your Student page
    };

    const handleViewStudent = (studentId) => {
        console.log(`Viewing details for student ID: ${studentId}`);
        setSelectedStudentId(studentId);
        setModalShow(true); // ✅ Open modal when View is clicked
      };

    const deleteStudent=(student)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this student!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = sessionStorage.getItem("token");
                deleteEligibleStudent(token,student.id).then((res)=>{
                    if(res.data.status_code==0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        lodeStudentTable();
                        updateStudent(student.studentId,"pending")

                    }
                })


            }
        });
    }

    const findStudent = () => {
        const token = sessionStorage.getItem("token");
        const params = {};

        if (selectedHostelId) params.hostelId = selectedHostelId;
        if (selectedRoomId) params.roomId = selectedRoomId;


        getAllEligibleStudentByFilter(token,params)
            .then((res) => {
                if(res.data.status_code===0){
                    setStudents(res.data.content);
                }else {
                    Swal.fire({
                        title: "Not Found",
                        text: "Data Not Found...",
                        icon: "error"
                    });
                }


            })
            .catch((error) => {
                console.error("Error fetching filtered student data:", error);
            });
    };

    const updateStudent=(id,stats)=>{
        const token = sessionStorage.getItem("token");
        const params = {};

        params.studentId = id;
        params.status=stats;
        updateStudentStatus(token,params).then((res)=>{
            console.log(res.data.content);
            if(res.data.status_code==0){
                lodeStudentTable();
            }

        })

    }

    return (
        <>
            <Tool />
            <SideBar />

            <div className="student-container">
                <h1 className="student-title">Eligible Students</h1>
                <div className="student-header">
                    <Form.Select
                        className="custom-input6"
                        size="sm"
                        value={selectedHostelId}
                        onChange={(e) => setSelectedHostelId(e.target.value)}
                    >

                        <option value="" disabled={true} > Select a Hostel </option>
                        {hostels.length > 0 &&
                            hostels.map((hostel) => (
                                <option key={hostel.id} value={hostel.id}>
                                    {hostel.hostel_name}
                                </option>
                            ))}
                    </Form.Select>


                    <Form.Select
                        className="custom-input6"
                        size="sm"
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                    >

                        <option value="" disabled={true} > Select a Room </option>
                        {rooms.length > 0 &&
                            rooms.map((room) => (
                                <option key={room.roomId} value={room.roomId}>
                                    {room.roomId}
                                </option>
                            ))}
                    </Form.Select>

                    <button className="add-select-student" onClick={findStudent}>
                        Find
                    </button>


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
                            students.map((student,index) => (
                                <tr key={student.id}>
                                    <td>{++index}</td>
                                    <td>{student.studentId}</td>
                                    <td>{student.firstName + " " + student.lastName}</td>
                                    <td>{student.facultyName}</td>
                                    <td>{student.contactNumber}</td>
                                    <td>{student.email}</td>
                                    <td>{student.hostel_detail.hostel_name}</td>
                                    <td>{student.roomId}</td>
                                    <td>
                                        <button className="action-btn view-btn" onClick={() => handleViewStudent(student)}></button>
                                        <button className="action-btn delete-btn" onClick={() => deleteStudent(student)}></button>
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
