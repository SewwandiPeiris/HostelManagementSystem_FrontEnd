import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Asset.css'
const Asset = () => {
    return (
      <>
        <SideBar />
            <Tool />
            <div className="asset-container">
      <h2 className="title">Hostel Assets</h2>
      <button className="add-room-button">Add Assets</button>
      <table className="asset-table">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Asset Name</th>
            <th>Room ID</th>
            <th>Filled Capacity</th>
            <th>Hostel ID</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  
            </>
  );
};

export default Asset;