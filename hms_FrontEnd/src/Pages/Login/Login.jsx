import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setErrorMessage('Both fields are required.');
    } else {
      setErrorMessage('');
      console.log('Username:', username);
      console.log('Password:', password);
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
                placeholder="Enter the Kelani mail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password : </Form.Label>
              <Form.Control
                className="custom-formcontrol1" 
                type="password"
                placeholder="Enter the password"
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

export default Login;

