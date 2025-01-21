import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Asset.css';

const Asset = () => {
  const navigate = useNavigate();

  const navigateToAddAsset = () => {
    navigate('/add_asset'); // Ensure this route matches the one defined in your router
  };

  return (
    <>
      <SideBar />
      <Tool />
      <div className="asset-container">
        <h2 className="title">Assets Details</h2>
        <button 
          className="add-asset-button"
          onClick={navigateToAddAsset}
        >
          Add Asset
        </button>
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
            {/* Example empty data row */}
            <tr>
              <td colSpan="7" className="no-data">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Asset;
