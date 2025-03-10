import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tool from '../../Components/Tool';
import './Add_Asset.css';

const AddAsset = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetId: '',
    assetName: '',
    roomId: '',
    filledCapacity: '',
    hostelId: '',
      remarks: '',
    action:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Asset Form Data:', formData);

    
    alert('Asset added successfully!');

    
    navigate('/assets');
  };

  return (
    <>
      <Tool />
      <div className="add-asset-container">
        <h1 className="add-asset-title">Add Asset Record</h1>
        <form className="add-asset-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="assetId">Asset ID:</label>
            <input
              type="text"
              id="assetId"
              name="assetId"
              value={formData.assetId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="assetName">Asset Name:</label>
            <input
              type="text"
              id="assetName"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              required
            />
          </div>
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
              Add Asset
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/assets')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAsset;
