import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import './Tool.css';

const Header = () => {
  return (
    <Container>
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">University of Kelaniya</Navbar.Brand>
        
      </Container>
    </Navbar></Container>
  );
};

export default Header;