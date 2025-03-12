import React, { useState } from "react";
import "./Sidebar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import icon1 from '../assets/icons8-home-50.png'
import icon2 from '../assets/student-with-graduation-cap.png'
import icon3 from '../assets/warning.png'
import icon4 from '../assets/assets.png'
import icon5 from '../assets/door.png'
import icon6 from '../assets/building.png'
import icon7 from '../assets/key.png'
import icon8 from '../assets/report.png'
import logo from '../assets/university-of-kelaniya-logo.png'
import icon9 from '../assets/log-out.png'
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
                  <Link className="link1" to="/admindashboard"> DashBorad</Link></li>
              <li>
              <img src={icon2} className="menu-icon" />
              <Link to="/student">Student</Link></li>
              <li>
              <img src={icon3} className="menu-icon" />
              <Link to="/damage">Damage</Link></li>
              <li>
              <img src={icon4} className="menu-icon" />
              <Link to="/asset">Asset</Link></li>
              <li>
              <img src={icon5} className="menu-icon" />
              <Link to="/room">Room</Link></li>    
              <li>
              <img src={icon6} className="menu-icon" />
              <Link to="/hostel">Hostel</Link></li>
              {/*<li>*/}
              {/*<img src={icon7} className="menu-icon" /> */}
              {/*<Link to="/admin">Admin</Link></li>*/}
              {/*<li>*/}
              {/*<img src={icon8} className="menu-icon" /> */}
              {/*<Link to="/report">Report</Link></li>*/}
              <li>
              <img src={icon9} className="menu-icon" /> 
              <Link to="/">Logout</Link ></li>
      </ul>
    </div>
  );
};

export default Sidebar;
