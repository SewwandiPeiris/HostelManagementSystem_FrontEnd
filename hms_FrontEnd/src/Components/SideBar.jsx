import React, { useState } from "react";
import "./Sidebar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import icon1 from '../assets/icons8-home-50.png'
import icon2 from '../assets/student-with-graduation-cap.png'
import icon3 from '../assets/warning.png'
import icon4 from '../assets/assets.png'
import icon5 from '../assets/door.png'
import icon6 from '../assets/building.png'
import icon7 from '../assets/key.png'
import icon8 from '../assets/report.png'
import logo from '../assets/university-of-kelaniya-logo.png'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

    
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="logo">
        <img src={logo}  className="logo-image" />
      </div>
      
          <ul className="menu">
                 
              <li>
                  <img src={icon1} className="menu-icon" />
              <a href="#">Home</a>  </li>
              <li>
              <img src={icon2} className="menu-icon" />
                  <a href="#">Student</a></li>
              <li>
              <img src={icon3} className="menu-icon" />
                  <a href="#">Damages</a></li>
              <li>
              <img src={icon4} className="menu-icon" />
                  <a href="#">Assets</a></li>
              <li>
              <img src={icon5} className="menu-icon" />
                  <a href="#">Room</a></li>     
              <li>
              <img src={icon6} className="menu-icon" />
                  <a href="#">Hostels</a></li>
              <li>
              <img src={icon7} className="menu-icon" /> 
                  <a href="#">Admin</a></li>
              <li>
              <img src={icon8} className="menu-icon" /> 
                  <a href="#">Reports</a></li>

      </ul>
    </div>
  );
};

export default Sidebar;
