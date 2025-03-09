import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Tool from '../../Components/Tool';
import './Add_Room.css';
import {addRoom, getAllHostel} from "../../Service/adminService.js";
import Swal from "sweetalert2";

const AddRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomId: '',
    hostel_id: '',
    room_capacity: '',
    filled_capacity: '',
    remark: '',
  });

  const [hostels, setHostelList] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    getAllHostel(token)
        .then((res) => {
          console.log(res.data.content);
          setHostelList(res.data.content); // ✅ Store API data
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Room Form Data:', formData);
    const token = sessionStorage.getItem("token");
    addRoom(token,formData).then((res)=>{
      console.log(res.data.content)
      if(res.data.status_code === 0){
        Swal.fire({
          title: "SUCCESS..!",
          text: "Room Add Success...",
          icon: "success"
        });
        navigate("/room")
        return;
      }else if(res.data.status_code === 1){
        Swal.fire({
          icon: "error",
          title: "OOPS..!",
          text: "Can't Submit.. Please Re try!",
        });
      }else if(res.data.status_code=== 3){
        Swal.fire({
          icon: "error",
          title: "OOPS..!",
          text: "This Room already exits.. Please Re try!",
        });

      }
    })
  };

  return (
    <>
      <Tool />
      <div className="add-room-container">
        <h1 className="add-room-title">Add Room Record</h1>
        <form className="add-room-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="roomId">Room ID:</label>
            <input
              type="text"
              id="roomId"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hostel_id">Hostel:</label>
            <select
                id="hostel_id"
                name="hostel_id"
                value={formData.hostel_id}
                onChange={handleChange}
                required
            >
              <option value=""> Select a Hostel </option>
              {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.hostel_name} {/* or hostel.hostelId if name is not available */}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="room_capacity">Room Capacity:</label>
            <input
              type="number"
              id="room_capacity"
              name="room_capacity"
              value={formData.room_capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="filled_capacity">Filled Capacity:</label>
            <input
              type="number"
              id="filled_capacity"
              name="filled_capacity"
              value={formData.filled_capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="remark">Remarks:</label>
            <textarea
              id="remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
                  </div>
            <div className="form-group">

          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Room
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/rooms')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
