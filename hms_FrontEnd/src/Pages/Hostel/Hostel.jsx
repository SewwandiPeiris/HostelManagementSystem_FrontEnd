import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';

import "./Hostel.css";
import {getAllHostel} from "../../Service/adminService.js";

const Hostel = () => {
  const navigate = useNavigate();

  const [hostels, setHostelList] = useState([]);

  useEffect(() => {
    const tokan = sessionStorage.getItem("token");

    getAllHostel(tokan)
        .then((res) => {
          console.log(res.data.content);
          setHostelList(res.data.content); // ✅ Store API data
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
  }, []);

  const navigateToAddHostel = () => {
    navigate('/add_hostel'); // Ensure this route matches the one in your router setup
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
              <th>Hostel Name</th>
              <th>Location</th>
              <th>Contract Fee</th>
              <th>Total Rooms</th>
              <th>Total Capacity</th>
              <th>Filled Capacity</th>
              <th>Available Capacity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {hostels.length > 0 ? (
              hostels.map((hostal) => (
                  <tr key={hostal.id}>
                    <td>{hostal.id}</td>
                    <td>{hostal.hostel_name}</td>
                    <td>{hostal.location}</td>
                    <td>{hostal.contract_fee}</td>
                    <td>{hostal.total_rooms}</td>
                    <td>{hostal.total_capacity}</td>
                    <td>{hostal.filled_capacity}</td>
                    <td>{hostal.available_capacity}</td>
                    <td>
                      <button className="action-btn view-btn" onClick={() => handleViewStudent(hostal)}>View</button>
                      <button className="action-btn delete-btn">Delete</button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="7" className="no-data">No data available</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Hostel;
