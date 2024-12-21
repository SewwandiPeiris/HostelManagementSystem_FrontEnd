import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Header.css';

const Header = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">University of Kelaniya</Navbar.Brand>
        <Button variant="danger">Apply Hostel</Button>
        <Button variant="warning">Login</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
