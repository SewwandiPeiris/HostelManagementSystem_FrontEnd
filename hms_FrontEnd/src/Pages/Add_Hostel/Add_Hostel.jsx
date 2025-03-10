import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Tool from '../../Components/Tool';
import SideBar from '../../Components/SideBar';
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
    remarks: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
      }
    });
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log('Hostel Form Data:', formData);
    setFormSubmitted(true);
    alert('Hostel added successfully!');
    navigate('/hostels');
  };

  return (
    <>
      <Tool />
      <SideBar/>
      
      <Container className="add-hostel-container mt-4">
        <h2 className="add-hostel-title">Add Hostel</h2>
        {formSubmitted && <Alert variant="success">Form submitted successfully!</Alert>}
        <Form className="add-hostel-form" onSubmit={handleSubmit}>
          <Row>
            {[
              { label: 'Hostel ID', name: 'hostelId', type: 'text' },
              { label: 'Hostel Category', name: 'hostelCategory', type: 'text' },
              { label: 'Hostel Name', name: 'hostelName', type: 'text' },
              { label: 'Location', name: 'location', type: 'text' },
              { label: 'Total Rooms', name: 'totalRooms', type: 'number' },
              { label: 'Total Capacity', name: 'totalCapacity', type: 'number' },
              { label: 'Filled Capacity', name: 'filledCapacity', type: 'number' },
              { label: 'Total Beds', name: 'totalBeds', type: 'number' },
              { label: 'Total Tables', name: 'totalTables', type: 'number' },
              { label: 'Total Chairs', name: 'totalChairs', type: 'number' },
            ].map(({ label, name, type }) => (
              <Col md={6} key={name} className="col3">
                <Form.Group controlId={name}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control 
                    type={type} 
                    name={name} 
                    value={formData[name]} 
                    onChange={handleChange} 
                    isInvalid={!!formErrors[name]} 
                  />
                  <Form.Control.Feedback type="invalid">{formErrors[name]}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="form-actions">
              <Button type="primary" className="submit-button2">Add Hostel</Button>
              <Button variant="danger" className="cancel-button" onClick={() => navigate('/hostels')}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddHostel;
