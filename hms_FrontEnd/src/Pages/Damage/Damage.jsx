import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import Bar from '../../Components/Bar';
import "./Damage.css";
const Damage= () => {
  return (
    <>
      <SideBar />
      <Tool />
      <Bar/>
          <div className="hostel-damages-container">
      <h2>Damage Details</h2>

      <div className="most-damages-box">
        <h4>Most Damages Reported Hostels</h4>
        {}
      </div>

      <button className="add-button">Add Damage</button>
      <table className="damages-table">
        <thead>
          <tr>
            <th>Damage ID</th>
            <th>Damage Date</th>
            <th>Damage Description</th>
            <th>Damage Payment</th>
            <th>Hostel ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example data. Replace with dynamic content */}
          <tr>
            <td colSpan="6" className="no-data">
              No data available
            </td>
          </tr>
        </tbody>
      </table>

      <button className="add-button">Add Damage Case</button>
      <table className="damage-case-table">
        <thead>
          <tr>
            <th>Damage Case ID</th>
            <th>Damage ID</th>
            <th>Student ID</th>
            <th>Penalty Payment</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example data. Replace with dynamic content */}
          <tr>
            <td colSpan="6" className="no-data">
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
          </>
  );
};

export default Damage;