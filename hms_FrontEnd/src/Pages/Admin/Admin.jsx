import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Admin.css';
import Bar from '../../Components/Bar';
const Admin = () => {
  
  const admins = [
    { id: 1, faculty: 'Science' },
  ];

  return (
    <>
      {}
      <SideBar />
      <Tool />
<Bar/>
      {}
      <div className="admins-container">
        <h2>Admin Details</h2>
        <table className="admins-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Faculty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr key={index}>
                  <td>{admin.id}</td>
                  <td>{admin.faculty}</td>
                  <td>
                    <button className="btn delete-btn">Delete</button>
                    <button className="btn update-btn">Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
