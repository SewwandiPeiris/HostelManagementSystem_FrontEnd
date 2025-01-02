import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import "./AdminDashBoard.css";
const AdminDashBoard= () => {
  return (
    <>
      <SideBar />
          <Tool />
          {/* Add a link to the Student page */}
      
        <Link to="/student"> </Link>
          <Link to="/report"></Link>
          <Link to="/damage"></Link>
          <Link to="/admin"></Link>
          <Link to="/asset"></Link>
          <Link to="/room"></Link>
          <Link to="/hostel"></Link>
          </>
  );
};

export default AdminDashBoard;