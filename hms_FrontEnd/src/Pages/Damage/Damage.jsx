import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Damage.css';

const Damage = () => {
  const navigate = useNavigate();

  const navigateToAddDamage = () => {
    navigate('/add_damage'); 
  };

  const navigateToAddDamageCase = () => {
    navigate('/add_damage_case'); 
  };

  return (
    <>
      <SideBar />
      <Tool />
      
      <div className="hostel-damages-container">
        <h2>Damage Details</h2>

        <div className="most-damages-box">
          <h4>Most Damages Reported Hostels</h4>
          {/* Add dynamic data here */}
        </div>

        {/* Add Damage Button - Navigation to Add Damage page */}
        <button
          className="add-damage-button"
          onClick={navigateToAddDamage}
        >
          Add Damage
        </button>

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

        {/* Add Damage Case Button - Navigation to Add Damage Case page */}
        <button
          className="add-damage-case-button"
          onClick={navigateToAddDamageCase}
        >
          Add Damage Case
        </button>

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
