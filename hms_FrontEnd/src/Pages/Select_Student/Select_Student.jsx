import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormLabel, Button } from 'react-bootstrap';
import './Select_Student.css';

const SelectStudent = () => {
    const navigate = useNavigate();

    
    const handleBack = () => {
        navigate('/student');  
    };

    return (
        <div className="select-student-container">
            <h1 className="select-student-title">Select Student</h1>
            <Button className="back-button" onClick={handleBack}>
                Back
            </Button>

            <Form className="select-student-form">
                <Form.Group>
                    <FormLabel>Search Student:</FormLabel>
                    <FormControl type="text" placeholder="Enter student ID or name" />
                </Form.Group>
            </Form>

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
                    {}
                    <tr>
                        <td colSpan="12" className="empty-row">No data available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SelectStudent;
