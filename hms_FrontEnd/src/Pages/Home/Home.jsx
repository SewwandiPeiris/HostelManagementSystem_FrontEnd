import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import buildingImage from '../../assets/image2.jpg';
import './Home.css'

const Home= () => {
  return (
    <>
     <Header/>
     <div className="home-container">
      <div className="background-image">
        <img src={buildingImage} alt="Hostel Building" className="img-fluid" />
      </div>
      <div className="content-box p-4 rounded shadow">
        <h1 className="custom-color">HMS</h1>
        <h2 className="custom-color1">Hostel Management System</h2>
        <h3 className="custom-color2 ">Welcome to Our Hostel!</h3>
        <p>
          Experience comfort and convenience in a safe and welcoming environment. 
          Our hostel offers modern facilities, spacious rooms, and a vibrant community, 
          designed to make you feel at home.Whether you're here for studies or work, 
          we ensure a peaceful stay with all the amenities you need.
        </p>
      </div>
     </div>
     <Footer/>
    </>
  );
};

export default Home;
