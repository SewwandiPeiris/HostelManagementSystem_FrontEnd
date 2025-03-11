import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import boyAvatar from "../../assets/boy.jpeg";
import girlAvatar from "../../assets/girl.jpg";
import "./UserAccount.css";
import { getprospectiveStudentById, getEligibleStudentByEmail } from "../../Service/studentService";

const UserAccount = ({ userData }) => {
  const [status, setStatus] = useState(""); // Selected, Pending, or Not Selected
  const [genderAvatar, setGenderAvatar] = useState("");
  const [prospectStudentData, setProspectStudentData] = useState(null);
  const [eligibleStudentData, setEligibleStudentData] = useState(null);

  useEffect(() => {
    if (!userData) return;

    if (userData.gender === "Male") {
      setGenderAvatar(boyAvatar);
    } else if (userData.gender === "Female") {
      setGenderAvatar(girlAvatar);
    }

    const dto = sessionStorage.getItem("studentDetails");
    if (!dto) return;

    const detailsDto = JSON.parse(dto);
    const token = sessionStorage.getItem("token");

    if (detailsDto.status === "pending" || detailsDto.status === "rejected") {
      getprospectiveStudentById(detailsDto.id, token)
        .then(response => {
          setProspectStudentData(response.data.content);
          console.log(response.data.content);
        })
        .catch(error => console.error("Error fetching user data:", error));
    } else if (detailsDto.status === "selected") {
      getEligibleStudentByEmail(detailsDto.email, token)
        .then(response => {
          setEligibleStudentData(response.data.content);
          console.log(response.data.content);
        })
        .catch(error => console.error("Error fetching eligible student data:", error));
    }

    setStatus(detailsDto.status);
  }, [userData]);

  const handleSendEmail = () => {
    window.location.href = "mailto:abc@gmail.com";
  };

  return (
    <Container className="user-account-container">
      <h2 className="text-center">User Details</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={3} className="text-center">
          <img src={genderAvatar} alt="User Avatar" className="user-avatar" />
        </Col>
        <Col xs={12} md={6}>
          <h5>{userData.firstName +" "+ userData.lastName}</h5>
          {status === "Selected" && <p>{userData.studentId}</p>}
          <p className={`status ${status === "Pending" ? "pending" : ""}`}>{status}</p>
          <Button variant="warning" onClick={handleSendEmail}>
            Requests & Claims
          </Button>
        </Col>
      </Row>

      {status === "pending" || status === "rejected" && (
        <Row className="mt-4">
          <Col xs={12} md={6} className="details-box">
            <h6>Name With Initials: {userData.nameWithInitials}</h6>
            <h6>Faculty Name: {userData.facultyName}</h6>
            <h6>Contact: {userData.contactNumber}</h6>
            <h6>Email: {userData.email}</h6>
            <h6>Home Address: {userData.street +" "+ userData.village}</h6>
          </Col>
        </Row>
      )}

      {status === "Selected" && (
        <Row className="mt-4">
          <Col xs={12} md={6} className="details-box">
            <h6>Name With Initials: {userData.nameWithInitials}</h6>
            <h6>Faculty Name: {userData.facultyName}</h6>
            <h6>Contact: {userData.contactNumber}</h6>
            <h6>Email: {userData.email}</h6>
            <h6>Home Address: {userData.street +" "+ userData.village}</h6>
          </Col>
          <Col xs={12} md={6} className="details-box">
            <h6>Assigned Hostel: {userData.hostel_id}</h6>
            <h6>Assigned Room: {userData.room_id}</h6>
            <h6>Enroll Date: {userData.enrollDate}</h6>
          </Col>
        </Row>
      )}

      <Container>
        <h1>User Account</h1>
      </Container>
    </Container>
  );
};

export default UserAccount;
