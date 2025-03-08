import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tool from '../../Components/Tool';
import './Add_Damage.css';

const AddDamage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    damageId: '',
    damageDate: '',
    damageDescription: '',
    damagePayment: '',
    hostelId: '',
    action: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Damage Form Data:', formData);
    alert('Damage added successfully!');
    navigate('/damages'); // Redirect to the damages list page after submission
  };

  return (
    <>
      <Tool />
      <div className="add-damage-container">
        <h1 className="add-damage-title">Add Damage Record</h1>
        <form className="add-damage-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Damage ID:</label>
            <input
              type="text"
              name="damageId"
              value={formData.damageId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Damage Date:</label>
            <input
              type="date"
              name="damageDate"
              value={formData.damageDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Damage Description:</label>
            <textarea
              name="damageDescription"
              value={formData.damageDescription}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Damage Payment (Amount):</label>
            <input
              type="number"
              name="damagePayment"
              value={formData.damagePayment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Hostel ID:</label>
            <input
              type="text"
              name="hostelId"
              value={formData.hostelId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Action Taken:</label>
            <textarea
              name="action"
              value={formData.action}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Damage
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/damages')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDamage;
