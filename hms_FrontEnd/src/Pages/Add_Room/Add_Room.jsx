import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tool from '../../Components/Tool';
import './Add_Room.css';

const AddRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomId: '',
    hostelId: '',
    roomCapacity: '',
    filledCapacity: '',
    availableCapacity: '',
      remarks: '',
    action:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Room Form Data:', formData);

    // Add your logic to save the form data, e.g., send it to an API
    alert('Room added successfully!');

    // Redirect to the rooms list page
    navigate('/rooms');
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
            <label htmlFor="hostelId">Hostel ID:</label>
            <input
              type="text"
              id="hostelId"
              name="hostelId"
              value={formData.hostelId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="roomCapacity">Room Capacity:</label>
            <input
              type="number"
              id="roomCapacity"
              name="roomCapacity"
              value={formData.roomCapacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="filledCapacity">Filled Capacity:</label>
            <input
              type="number"
              id="filledCapacity"
              name="filledCapacity"
              value={formData.filledCapacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="availableCapacity">Available Capacity:</label>
            <input
              type="number"
              id="availableCapacity"
              name="availableCapacity"
              value={formData.availableCapacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="remarks">Remarks:</label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
                  </div>
                  <div className="form-group">
            <label htmlFor="remarks">Action:</label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
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
