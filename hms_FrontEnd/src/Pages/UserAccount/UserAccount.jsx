import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import boyAvatar from "../../assets/boy.jpeg";
import girlAvatar from "../../assets/girl.jpg";
import "./UserAccount.css";
import { getprospectiveStudentById, getEligibleStudentByEmail } from "../../Service/studentService";

const UserAccount = () => {


  const [status, setStatus] = useState(""); // Selected, Pending, or Not Selected
  const [genderAvatar, setGenderAvatar] = useState("");
  const [prospectStudentData, setProspectStudentData] = useState(null);
  const [eligibleStudentData, setEligibleStudentData] = useState(null);
  const [userDta, setUserData] = useState(null);




  useEffect(()=>{
    console.log("ACERWHTRN")
      const dto = sessionStorage.getItem("studentDetails");
      const token = sessionStorage.getItem("token");
      if (!dto){
        return;
      }
     const detailsDto = JSON.parse(dto);
    console.log(detailsDto.id)
    setStatus(detailsDto.status);


    if (detailsDto.status === "pending" || detailsDto.status === "rejected") {
      getprospectiveStudentById(detailsDto.id, token)
          .then((response) => {
            const user=response.data.content;
            setProspectStudentData(user);
            setUserData(user)
            console.log(user)
            profile(user);
          })
          .catch(error => console.error("Error fetching user data:", error));
    } else if (detailsDto.status === "selected") {
        getEligibleStudentByEmail(detailsDto.email, token)
          .then((response) => {
            const user=response.data.content;
            setEligibleStudentData(user);
            setUserData(user)
            console.log(response.data.content)
            profile(user);
            // manageProfilePic(user);

            // console.log(user);
          })
          .catch(error => console.error("Error fetching eligible student data:", error));
      }







  },[]);

  const profile = (user) => {
    if (!user) return;

    if (user.gender === "male") {
      setGenderAvatar(boyAvatar);
    } else if (user.gender === "female") {
      setGenderAvatar(girlAvatar);
    }
  };



  const handleSendEmail = () => {
    window.location.href = "mailto:abc@gmail.com";
  };


const a=prospectStudentData || eligibleStudentData || userDta

if(!a){
  return
}



  return (
      <Container className="user-account-container">

        <h2 className="text-center">User Details</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={3} className="text-center">
            <img src={genderAvatar} alt="User Avatar" className="user-avatar" />
          </Col>
          <Col xs={12} md={6}>
            <h5>{userDta.firstName + " " + userDta.lastName}</h5>
            {status === "selected" && <p>{userDta.studentId}</p>}
            <p className={`status ${status === "pending" ? "pending" : ""}`}>{status}</p>
            <Button variant="warning" onClick={handleSendEmail}>
              Requests & Claims
            </Button>
          </Col>
        </Row>

        {(status === "pending" || status === "rejected") && (
            <Row className="mt-4">
              <Col xs={12} md={6} className="details-box">
                <h6>Name With Initials: {userDta.nameWithInitials}</h6>
                <h6>Faculty Name: {userDta.facultyName}</h6>
                <h6>Contact: {userDta.contactNumber}</h6>
                <h6>Email: {userDta.email}</h6>
                <h6>Home Address: {userDta.street + " " + userDta.village}</h6>
              </Col>
            </Row>
        )}

        {status === "selected" && (
            <Row className="mt-4">
              <Col xs={12} md={6} className="details-box">
                <h6>Name With Initials: {userDta.nameWithInitials}</h6>
                <h6>Faculty Name: {userDta.facultyName}</h6>
                <h6>Contact: {userDta.contactNumber}</h6>
                <h6>Email: {userDta.email}</h6>
                <h6>Home Address: {userDta.street + " " + userDta.village}</h6>
              </Col>
              <Col xs={12} md={6} className="details-box">
                <h6>Assigned Hostel: {userDta.hostel_detail?.hostel_name}</h6>
                <h6>Assigned Room: {userDta.roomId}</h6>
                <h6>Enroll Date: {userDta.enrollDate}</h6>
              </Col>
            </Row>
        )}
      </Container>
  );
};

export default UserAccount;
