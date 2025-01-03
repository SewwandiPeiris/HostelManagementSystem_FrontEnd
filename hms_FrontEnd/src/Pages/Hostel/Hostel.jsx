import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import "./Hostel.css";
const Hostel = () => {
  return (
    <>
      <SideBar />
      <Tool />
      <div className="hostels-container">
        <h1 className="hostels-title">Hostel Details</h1>
        <button className="add-hostel-button">Add Hostel</button>
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
            {/* Rows can be dynamically rendered here */}
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
