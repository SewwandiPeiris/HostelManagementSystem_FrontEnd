import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Select_Student.css';

const SelectStudent = () => {
    const navigate = useNavigate();

    // Function to navigate back to the Student page
    const handleBack = () => {
        navigate('/student'); // Replace '/student' with the correct route of your Student page
    };

    return (
        <div className="select-student-container">
            <h1 className="select-student-title">Select Student</h1>
            <button className="back-button" onClick={handleBack}>
                Back
            </button>
            <table className="select-student-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact Number</th>
                        <th>Name with Initials</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>National ID</th>
                        <th>Contact Number</th>
                        <th>Enroll Date</th>
                        <th>Hostel ID</th>
                        <th>Room ID</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Rows can be dynamically rendered here */}
                    <tr>
                        <td colSpan="12" className="empty-row">No data available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SelectStudent;
