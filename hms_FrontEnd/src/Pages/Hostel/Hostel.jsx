import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';

import "./Hostel.css";

const Hostel = () => {
  const navigate = useNavigate();

  const navigateToAddHostel = () => {
    navigate('/add_hostel'); 
  };

  return (
    <>
      <SideBar />
      <Tool />
      
      <div className="hostels-container">
        <h1 className="hostels-title">Hostel Details</h1>
        <button 
          className="add-hostel-button" 
          onClick={navigateToAddHostel}
        >
          Add Hostel
        </button>
        <table className="hostels-table">
          <thead>
            <tr>
              <th>Hostel ID</th>
              <th>Hostel Category</th>
              <th>Hostel Name</th>
              <th>Location</th>
              <th>Total Rooms</th>
              <th>Total Capacity</th>
              <th>Filled Capacity</th>
              <th>Available Capacity</th>
              <th>Total Beds</th>
              <th>Total Tables</th>
              <th>Total Chairs</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {}
            <tr>
              <td colSpan="12" className="empty-row">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Hostel;
