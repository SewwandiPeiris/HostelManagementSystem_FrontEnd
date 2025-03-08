import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tool from '../../Components/Tool';
import './Add_Hostel.css';

const AddHostel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelId: '',
    hostelCategory: '',
    hostelName: '',
    location: '',
    totalRooms: '',
    totalCapacity: '',
    filledCapacity: '',
    availableCapacity: '',
    totalBeds: '',
    totalTables: '',
    totalChairs: '',
    action: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hostel Form Data:', formData);

    // Add logic to save the form data, e.g., send it to an API
    alert('Hostel added successfully!');

    // Redirect to the hostels list page
    navigate('/hostels');
  };

  return (
    <>
      <Tool />
      <div className="add-hostel-container">
        <h1 className="add-hostel-title">Add Hostel</h1>
        <form className="add-hostel-form" onSubmit={handleSubmit}>
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
            <label htmlFor="hostelCategory">Hostel Category:</label>
            <input
              type="text"
              id="hostelCategory"
              name="hostelCategory"
              value={formData.hostelCategory}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hostelName">Hostel Name:</label>
            <input
              type="text"
              id="hostelName"
              name="hostelName"
              value={formData.hostelName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalRooms">Total Rooms:</label>
            <input
              type="number"
              id="totalRooms"
              name="totalRooms"
              value={formData.totalRooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalCapacity">Total Capacity:</label>
            <input
              type="number"
              id="totalCapacity"
              name="totalCapacity"
              value={formData.totalCapacity}
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
            <label htmlFor="totalBeds">Total Beds:</label>
            <input
              type="number"
              id="totalBeds"
              name="totalBeds"
              value={formData.totalBeds}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalTables">Total Tables:</label>
            <input
              type="number"
              id="totalTables"
              name="totalTables"
              value={formData.totalTables}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalChairs">Total Chairs:</label>
            <input
              type="number"
              id="totalChairs"
              name="totalChairs"
              value={formData.totalChairs}
              onChange={handleChange}
              required
            />
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
              Add Hostel
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/hostels')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddHostel;
