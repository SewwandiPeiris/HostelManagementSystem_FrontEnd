import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import boyAvatar from "../../assets/boy.jpeg";
import girlAvatar from "../../assets/girl.jpg";
import "./UserAccount.css";

const UserAccount = ({ userData }) => {
  const [status, setStatus] = useState(""); // Selected, Pending, or Not Selected
  const [genderAvatar, setGenderAvatar] = useState(""); 

  useEffect(() => {
    if (userData.gender === "Male") {
      setGenderAvatar(boyAvatar);
    } else if (userData.gender === "Female") {
      setGenderAvatar(girlAvatar);
    }

    setStatus(userData.status); // Status from the database (Selected, Pending, or Not Selected)
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
          <h5>{userData.name_with_initials}</h5>
          {status === "Selected" && <p>{userData.student_number}</p>}
          <p className={`status ${status === "Pending" ? "pending" : ""}`}>
            {status}
          </p>
          <Button variant="warning" onClick={handleSendEmail}>
            Requests & Claims
          </Button>
        </Col>
      </Row>

      {status === "pending" && (
        <Row className="mt-4">
          <Col xs={12} md={6} className="details-box">
            <h6>Full Name: {userData.full_name}</h6>
            <h6>Faculty Name: {userData.faculty_name}</h6>
            <h6>Contact: {userData.contact}</h6>
            <h6>Email: {userData.email}</h6>
            <h6>Home Address: {userData.home_address}</h6>
          </Col>
        </Row>
      )}

      {status === "Selected" && (
        <Row className="mt-4">
          <Col xs={12} md={6} className="details-box">
            <h6>Full Name: {userData.full_name}</h6>
            <h6>Faculty Name: {userData.faculty_name}</h6>
            <h6>Contact: {userData.contact}</h6>
            <h6>Email: {userData.email}</h6>
            <h6>Home Address: {userData.home_address}</h6>
          </Col>
          <Col xs={12} md={6} className="details-box">
            <h6>Assign Hostel: {userData.assign_hostel}</h6>
            <h6>Assign Room: {userData.assign_room}</h6>
            <h6>Enroll Date: {userData.enroll_date}</h6>
            <h6>Annual Payment: {userData.annual_payment}</h6>
            <h6>Payment Date: {userData.payment_date}</h6>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UserAccount;

