import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import boyAvatar from "../../assets/boy.jpeg";
import girlAvatar from "../../assets/girl.jpg";
import "./UserAccount.css";
import { getprospectiveStudentById,getEligibleStudentByEmail } from "../../Service/studentService"
 



const UserAccount = () => {
  const [prosepectStudentData, setUserData] = useState(null);
  const [elegibleStudentData, setEligible] = useState(null);
  const [genderAvatar, setGenderAvatar] = useState("");

  useEffect(() => {

    const dto = sessionStorage.getItem("studentDetails");
    const detailsDto = JSON.parse(dto);
    const tokan = sessionStorage.getItem("token")
 

      if (detailsDto.status === "pending") {

        // Fetch user data from backend
        getprospectiveStudentById(detailsDto.id, tokan)
          .then(response => {
            // setUserData(response.data);
  
            setUserData(response.data.content)
  
            console.log(response.data.content)
          })
          .catch(error => console.error("Error fetching user data:", error));
  
      } else if (detailsDto.status === "selected") {
  
        getEligibleStudentByEmail(detailsDto.email, tokan)
          .then(response => {
            // setUserData(response.data);
  
            setEligible(response.data.content)
  
            console.log(response.data.content)
          })
          .catch(error => console.error("Error fetching user data:", error));
  
      }
  }, []);



  return (
    <Container >
      <h1>User Account</h1>
    </Container>
  );
};

export default UserAccount;

