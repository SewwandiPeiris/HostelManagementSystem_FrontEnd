import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import Dashboard from "../../Components/Dashboard";

import "./AdminDashBoard.css";
const AdminDashBoard= () => {
  return (
    <>
      <SideBar />
          <Tool />
          <Dashboard/>
      
        
          </>
  );
};

export default AdminDashBoard;