import{ useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './Login.css';
import { decodeJwtToken, loginStudentProfile} from '../../Service/loginService';
import { basicLoginDTO}from '../../Dto/basicLoginDto'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {studentDetailsDto} from "../../Dto/studentDetails.js";

const Login1 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setErrorMessage('Both fields are required.');
    } else {
      setErrorMessage('');
      const loginDto=basicLoginDTO(username,password)

      loginStudentProfile(loginDto).then((res)=>{
        console.log(res.data.content);
        if(res.data.status_code === 0) {
          Swal.fire({
            title: "Login Success..!",
            text: "You log to user profile...",
            icon: "success"
          });

          sessionStorage.setItem("token",res.data.content)
          const decryptedJWT = decodeJwtToken(res.data.content);
          const studentDetails=studentDetailsDto(decryptedJWT.id,decryptedJWT.Status,decryptedJWT.Role, decryptedJWT.sub);

          sessionStorage.setItem("studentDetails",JSON.stringify(studentDetails))
          console.log("Decrypted JWT:", decryptedJWT);
          if(studentDetails.role==="Admin"){
            console.log("admin")
            navigate("/admindashboard")

          }else if(studentDetails.role==="Student"){
            navigate("/useraccount");
          }

        }else if(res.data.status_code === 2){
          Swal.fire({
            icon: "error",
            title: "Oops..!",
            text: "Invalid Login Credential.",

          });
        }

      })
  
      // Add your login logic here
    }
  };

  return (
    <>
    <Header/>
    <div className="content">
    <Container className="custom-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="custom-h2">Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleLogin} className="form">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username : </Form.Label>
              <Form.Control
                className="custom-formcontrol1" 
                type="text"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password : </Form.Label>
              <Form.Control
                className="custom-formcontrol1" 
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div>
              <Button className="custom-button2" variant="warning" type="submit">Login</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
    
    <Footer/>
    </>
  );
 
};

export default Login1;

