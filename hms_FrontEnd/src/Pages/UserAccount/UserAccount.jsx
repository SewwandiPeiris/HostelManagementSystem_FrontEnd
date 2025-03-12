import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import boyAvatar from "../../assets/boy.jpeg";
import girlAvatar from "../../assets/girl.jpg";
import "./UserAccount.css";
import { getprospectiveStudentById, getEligibleStudentByEmail } from "../../Service/studentService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const UserAccount = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(""); // Selected, Pending, or Not Selected
  const [genderAvatar, setGenderAvatar] = useState("");
  const [prospectStudentData, setProspectStudentData] = useState(null);
  const [eligibleStudentData, setEligibleStudentData] = useState(null);
  const [userDta, setUserData] = useState(null);

  useEffect(() => {
    console.log("ACERWHTRN")
    const dto = sessionStorage.getItem("studentDetails");
    const token = sessionStorage.getItem("token");
    if (!dto) {
      return;
    }
    const detailsDto = JSON.parse(dto);
    console.log(detailsDto.id)
    setStatus(detailsDto.status);

    if (detailsDto.status === "pending" || detailsDto.status === "rejected") {
      getprospectiveStudentById(detailsDto.id, token)
        .then((response) => {
          const user = response.data.content;
          setProspectStudentData(user);
          setUserData(user)
          console.log(user)
          profile(user);
        })
        .catch(error => console.error("Error fetching user data:", error));
    } else if (detailsDto.status === "selected") {
      getEligibleStudentByEmail(detailsDto.email, token)
        .then((response) => {
          const user = response.data.content;
          setEligibleStudentData(user);
          setUserData(user)
          console.log(response.data.content)
          profile(user);
          // manageProfilePic(user);

          // console.log(user);
        })
        .catch(error => console.error("Error fetching eligible student data:", error));
    }

  }, []);

  const logout=()=>{
    console.log("ssdfsdffsdg")
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Logout!",
          text: "",
          icon: "success"
        });
        navigate('/');
      } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "",
          icon: "error"
        });
      }
    });

  }

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

  const a = prospectStudentData || eligibleStudentData || userDta

  if (!a) {
    return
  }

  return (
    <>
    <Header/>
    <Container className="user-account-container">
      <button className="bn21" onClick={logout}>Logout</button>
      <h2 className="pageName">User Details</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={3} className="c11">
          <img src={genderAvatar} alt="User Avatar" className="user-avatar" />
        </Col>
        <Col xs={12} md={6} className="c12">
          <h5 className="studentName">{userDta.firstName + " " + userDta.lastName}</h5>
          {status === "selected" && <p>{userDta.studentId}</p>}
          <p className={`status ${status === "pending" ? "pending" : ""}`}>{status}</p>
          <Button variant="warning" onClick={handleSendEmail}>
            <strong>Requests & Claims</strong>
          </Button>
        </Col>
      </Row>

      {(status === "pending" || status === "rejected") && (
        <Row className="r11">
          <Col xs={12} md={6} className="details-box1">
            <h6>Name With Initials:<strong> {userDta.nameWithInitials}</strong></h6>
            <h6>Faculty Name: <strong>{userDta.facultyName}</strong></h6>
            <h6>Contact:<strong>{userDta.contactNumber}</strong> </h6>
            <h6>Email:<strong>{userDta.email}</strong> </h6>
            <h6>Home Address: <strong>{userDta.street + " " + userDta.village}</strong></h6>
          </Col>
        </Row>
      )}

      {status === "selected" && (
        <Row className="r11">
          <Col xs={12} md={6} className="details-box1">
            <h6>Name With Initials: <strong>{userDta.nameWithInitials}</strong></h6>
            <h6>Faculty Name: <strong>{userDta.facultyName}</strong></h6>
            <h6>Contact:<strong>{userDta.contactNumber}</strong> </h6>
            <h6>Email: <strong>{userDta.email}</strong></h6>
            <h6>Home Address:<strong>{userDta.street + " " + userDta.village}</strong> </h6>
          </Col>
          <Col xs={12} md={6} className="details-box2">
            <h6>Assigned Hostel: <strong>{userDta.hostel_detail?.hostel_name}</strong></h6>
            <h6>Assigned Room: <strong>{userDta.roomId}</strong></h6>
            <h6>Enroll Date: <strong>{userDta.enrollDate}</strong></h6>
          </Col>
        </Row>
      )}
    </Container>
    <Footer/>
    </>
  );
};

export default UserAccount;
