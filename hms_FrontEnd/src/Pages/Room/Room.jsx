import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Room.css';
import { getAllRooms} from "../../Service/adminService.js";

const Room = () => {
  const navigate = useNavigate();

  const [rooms, setRoomList] = useState([]);

  useEffect(() => {
    const tokan = sessionStorage.getItem("token");

    getAllRooms(tokan).then((res)=>{
      console.log(res.data.content);
      setRoomList(res.data.content);
    }).
    catch((error) => {
      console.error("Error fetching student data:", error);
    });

  }, []);

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
              <th>Hostel </th>
              <th>Room Capacity</th>
              <th>Filled Capacity</th>
              <th>Available Capacity</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {rooms.length > 0 ? (
              rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.roomId}</td>
                    <td>{room.hostelDetail.id+ " - "+ room.hostelDetail.hostel_name}</td>
                    <td>{room.room_capacity}</td>
                    <td>{room.filled_capacity}</td>
                    <td>{(room.room_capacity-room.filled_capacity)  }</td>
                    <td>{room.remark}</td>
                    <td>
                      <button className="action-btn view-btn" onClick={() => handleViewStudent(room)}>View</button>
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

export default Room;
