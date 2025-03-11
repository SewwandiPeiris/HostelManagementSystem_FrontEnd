import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Damage.css';
import {getAllDamageCase, getAllDamageMaster} from "../../Service/adminService.js";

const Damage = () => {
  const navigate = useNavigate();
  const [damageMasters, setDamageMaster] = useState([]);
  const [damageCase, setDamageCase] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getAllDamageMaster(token).then((res)=>{
      console.log(res.data.content)
      setDamageMaster(res.data.content);
    })

    getAllDamageCase(token).then((res)=>{
      console.log(res.data.content)
      setDamageCase(res.data.content);
    })

  }, []);

  const navigateToAddDamage = () => {
    navigate('/add_damage'); 
  };

  const navigateToAddDamageCase = () => {
    navigate('/add_damage_case'); 
  };

  const handleViewDamgeMaster=(dm)=> {

  }

  const handleViewDamageCase=(dc)=>{

  }

  return (
    <>
      <SideBar />
      <Tool />
      
      <div className="hostel-damages-container">
        <h2>Damage Details</h2>


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
              <th>NO</th>
              <th>Damage ID</th>
              <th>Damage Date</th>
              <th>Damage Description</th>
              <th>Damage Payment</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {damageMasters.length > 0 ? (
              damageMasters.map((dm, index) => (
                  <tr key={dm.id}>
                    <td>{++index}</td>
                    <td>{dm.id}</td>
                    <td>{dm.damage_date}</td>
                    <td>{dm.description}</td>
                    <td>{dm.damage_price}</td>


                    <td>
                      <button className="action-btn view-btn" onClick={() => handleViewDamgeMaster(dm)}></button>
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
              <th>No</th>
              <th>Damage Case ID</th>
              <th>Damage ID</th>
              <th>Student ID</th>
              <th>Penalty Payment</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {damageCase.length > 0 ? (
              damageCase.map((dc, index) => (
                  <tr key={dc.id}>
                    <td>{++index}</td>
                    <td>{dc.id}</td>
                    <td>{dc.damageMaster.id+"-"+dc.damageMaster.description}</td>
                    <td>{dc.studentId}</td>
                    <td>{dc.penalty_price}</td>
                    <td>{dc.payment_status}</td>
                    <td>
                      <button className="action-btn view-btn" onClick={() => handleViewDamageCase(dc)}></button>
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

export default Damage;
