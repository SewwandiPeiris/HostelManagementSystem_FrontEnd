import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import logo from '../assets/logo.png'
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="custom-brand">
        <Image alt="Logo" src={logo} fluid className="brand-logo" />University of Kelaniya</Navbar.Brand>
        <Navbar.Toggle />
        {isHomepage && (
        <div className="button-group">
        <Link to="/login">
          <Button variant="danger" className="custom-button">Apply Hostel</Button>
        </Link>
        <Link to="/login">
          <Button variant="warning" className="custom-button1">Login</Button>
        </Link>
        </div>)}
      </Container>
    </Navbar>
    );
}

export default Header;
