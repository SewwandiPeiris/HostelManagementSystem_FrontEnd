import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import "./Report.css";
const Report= () => {
  return (
    <>
      <SideBar />
          <Tool />
          <div className="reports-container">
      <h1 className="reports-title">Create Reports</h1>
      <div className="filters-container">
        <input
          type="text"
          placeholder="Filter by Gender"
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filter by Hostel"
          className="filter-input"
        />
      </div>
      <input
        type="text"
        placeholder="What you need?"
        className="query-input"
      />
      <button className="fetch-button">Fetch Data</button>
    </div>
          </>
  );
};

export default Report;