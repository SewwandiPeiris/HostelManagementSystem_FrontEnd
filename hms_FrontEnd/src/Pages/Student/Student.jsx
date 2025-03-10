import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import SideBar from "../../Components/SideBar";
import Tool from "../../Components/Tool";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './Student.css';
import {
  addEligibleStudent,
  getAllHostel,
  getAllProspectiveStudent,
  getAllProspectiveStudentByFilter,
  getRoomByHostelId, updateHostelAndRoomCapacity
} from "../../Service/adminService.js";
import Swal from "sweetalert2";

const Student = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudentId] = useState(null);
  const [students, setStudents] = useState([]);

  const [salary, setSalary] = useState('');
  const [distance, setDistance] = useState('');
  const [gender, setGender] = useState('');
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHostelId, setSelectedHostelId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");


  useEffect(() => {
    const tokan = sessionStorage.getItem("token");

    getAllProspectiveStudent(tokan)
      .then((res) => {
        console.log(res.data.content);
        setStudents(res.data.content); 
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });

    getAllHostel(tokan)
        .then((res)=>{
          setHostels(res.data.content)

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

  const handleSelectStudent = () => {
    navigate('/select_student'); //  Navigates to Select Student page
  };

  const findStudent = () => {
    const token = sessionStorage.getItem("token");
    const params = {};

    if (salary) params.salary = salary;
    if (distance) params.distance = distance;
    if (gender) params.gender = gender;

    getAllProspectiveStudentByFilter(token,params)
        .then((res) => {

          setStudents(res.data.content);
        })
        .catch((error) => {
          console.error("Error fetching filtered student data:", error);
        });
  };
  const handleViewStudent = (student) => {

    setSelectedStudentId(student);
    setModalShow(true); // ✅ Open modal when View is clicked
  };


  const saveEligibleStudent= (selectedStudent) =>{

    if (!selectedStudent){
      return
    }

    const studentDto={
      id: "",
      firstName: selectedStudent.firstName,
      lastName: selectedStudent.lastName,
      nameWithInitials: selectedStudent.nameWithInitials,
      nationalId:selectedStudent.nationalId,
      gender: selectedStudent.gender,
      email: selectedStudent.email,
      password: selectedStudent.password,
      studentId: selectedStudent.studentId,
      contactNumber: selectedStudent.contactNumber,
      street: selectedStudent.street,
      village: selectedStudent.village,
      district:selectedStudent.district,
      province: selectedStudent.province,
      postalCode: selectedStudent.postalCode,
      distanceToHome: selectedStudent.distanceToHome,
      mainIncome: selectedStudent.mainIncome,
      additionalIncome: selectedStudent.additionalIncome,
      numberFamilyMembers: selectedStudent.numberFamilyMembers,
      numberOfSiblings: selectedStudent.numberOfSiblings,
      numberOfSiblingsEdu: selectedStudent.numberOfSiblingsEdu,
      nameOfGuardian: selectedStudent.nameOfGuardian,
      guardianContactNumber: selectedStudent.guardianContactNumber,
      facultyName: selectedStudent.facultyName,
      annualSalary: selectedStudent.annualSalary,
      enrollDate: new Date(),
      roomId:selectedRoomId,
      hostel_id:selectedHostelId
    }

    console.log(studentDto)
    const token = sessionStorage.getItem("token");
    addEligibleStudent(token,studentDto).then((res)=>{
      console.log(res.data.content);

      if(res.data.status_code === 0){
        Swal.fire({
          title: "Success..!",
          text: "Student Add Success..",
          icon: "success"
        });
        const commonDto={
          upd_filled_capacity:1,
          upd_total_rooms:0,
          upd_room_filled_capacity:1,
          roomId:selectedRoomId
        }
       updateHostelAndRoomCapacity(token,selectedHostelId,commonDto).then((res)=>{
         console.log(res.data.content);

       })
        navigate("/select_student");
        return;

      }else if(res.data.status_code === 1){
        Swal.fire({
          icon: "error",
          title: "Oops..!",
          text: "Can't Add Student.. Please Re try!",
        });
      }

    });


  };

  return (
    <>
      <Tool />
      <SideBar />

      <div className="student-container">
        <h1 className="student-title">Prospective Students Details</h1>

        <div className="student-header">
          <Form.Control
              className="custom-input6"
              type="text"
              placeholder="Salary below (Rs)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
          />
          <Form.Control
              className="custom-input6"
              type="text"
              placeholder="Distance more than (km)"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
          />
          <Form.Select
              className="custom-input5"
              size="sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>

          <button className="add-select-student" onClick={findStudent}>
            Find
          </button>

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
              students.map((student, index) => (
                <tr key={student.id}>
                  <td>{++index}</td>
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

              <Form.Select
                  className="custom-input7"
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
                  className="custom-input7"
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="custom-modal3">
          <Button variant="primary" className="custom-button6" onClick={() => saveEligibleStudent(selectedStudent)} >Eligeble</Button>
          <Button variant="danger" className="custom-button7">Not Eligeble</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Student;
