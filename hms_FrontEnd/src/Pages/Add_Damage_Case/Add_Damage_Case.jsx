import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tool from '../../Components/Tool';
import './Add_Damage_Case.css';

const AddDamageCase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    damageCaseId: '',
    damageId: '',
    studentId: '',
    penaltyPayment: '',
    paymentStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Damage Case Form Data:', formData);

    // Add your logic here to save the form data, e.g., send it to a server or API
    alert('Damage case added successfully!');

    // Redirect to the damage cases list page
    navigate('/damages');
  };

  return (
    <>
      <Tool />
      <div className="add-damage-case-container">
        <h1 className="add-damage-case-title">Add Damage Case</h1>
        <form className="add-damage-case-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="damageCaseId">Damage Case ID:</label>
            <input
              type="text"
              id="damageCaseId"
              name="damageCaseId"
              value={formData.damageCaseId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="damageId">Damage ID:</label>
            <input
              type="text"
              id="damageId"
              name="damageId"
              value={formData.damageId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentId">Student ID:</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="penaltyPayment">Penalty Payment:</label>
            <input
              type="number"
              id="penaltyPayment"
              name="penaltyPayment"
              value={formData.penaltyPayment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentStatus">Payment Status:</label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Damage Case
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

export default AddDamageCase;
