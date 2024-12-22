import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../assets/logo.png'
import './Footer.css';

const Footer =() => {
  return (
    <Navbar className="custom-navbar1">
    <Container className="footer-container">
      <div className="footer-left">
        <Image alt="Logo" src={logo} fluid className="brand-logo1" />
        <div className="footer-title">
            <span className="university-of">University of</span>
            <br />
            <span className="kelaniya">Kelaniya</span>
          </div>
      </div>
      <div className="footer-right">
          <p className="footer-links">
            <a href="#user-policy" className="footer-link">User Policy</a> | 
            <a href="#it-security-policy" className="footer-link"> IT Security Policy</a> | 
            <a href="#social-media-policy" className="footer-link"> Social Media Policy</a> | 
            <a href="#privacy-statement" className="footer-link"> Privacy Statement</a> | 
            <a href="#cookies-policy" className="footer-link"> Cookies Policy</a> | 
            <a href="#site-map" className="footer-link"> Site Map</a>
          </p>
          <p className="footer-contact">
            University of Kelaniya, Kandy Road, Dalugama, Kelaniya 11600, Sri Lanka |
            <a href="mailto:info@kln.ac.lk" className="footer-link"> info@kln.ac.lk</a> |
            <a href="tel:+94112903903" className="footer-link"> +9411 2 903 903</a>
          </p>
        </div>
    </Container>
  </Navbar>

  );
}

export default Footer;