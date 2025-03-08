import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tool from '../../Components/Tool';
import './Add_Student.css';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    nameWithInitials: '',
    fullName: '',
    facultyName: '',
    contact: '',
    email: '',
    hostelId: '',
    roomId: '',
  });

  const faculties = [
    'Faculty of Science',
    'Faculty of Medicine',
    'Faculty of Humanities',
    'Faculty of Social Sciences',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add logic to send data to backend or state management
    alert('Student added successfully!');
    navigate('/students'); // Redirect to the students list page after submission
  };

  return (
    <>
          <Tool />
          
      <div className="add-student-container">
        <h1 className="add-student-title">Add New Student</h1>
        <form className="add-student-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID:</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Name with Initials:</label>
            <input
              type="text"
              name="nameWithInitials"
              value={formData.nameWithInitials}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Faculty Name:</label>
            <select
              name="facultyName"
              value={formData.facultyName}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Faculty
              </option>
              {faculties.map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
            <label>Room ID:</label>
            <input
              type="text"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Student
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/students')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStudent;
