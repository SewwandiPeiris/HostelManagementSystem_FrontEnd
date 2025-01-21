import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Room.css';

const Room = () => {
  const navigate = useNavigate();

  const navigateToAddRoom = () => {
    navigate('/add_room'); // Ensure this route matches the one defined in your router
  };

  return (
    <>
      <SideBar />
      <Tool />

      <div className="hostel-rooms-container">
        <h2 className="title">Room Details</h2>
        <button 
          className="add-room-button"
          onClick={navigateToAddRoom}
        >
          Add Room
        </button>
        <table className="hostel-table">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Hostel ID</th>
              <th>Room Capacity</th>
              <th>Filled Capacity</th>
              <th>Available Capacity</th>
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

export default Room;
