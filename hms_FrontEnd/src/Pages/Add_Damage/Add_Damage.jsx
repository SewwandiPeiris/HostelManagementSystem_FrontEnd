import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Tool from '../../Components/Tool';
import SideBar from '../../Components/SideBar';
import Swal from 'sweetalert2';
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

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
      }
    });
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
    console.log('Damage Form Data:', formData);

    // Show success message
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Damage record added successfully!',
      showConfirmButton: false,
      timer: 3000
    });

    // Redirect to damages list
    navigate('/damage');
  };

  return (
    <>
      <Tool />
      <SideBar />
      <Container className="add-damage-container mt-4">
        <h2 className="add-damage-title">Add Damage Record</h2>
        {formSubmitted && <Alert variant="success">Damage record added successfully!</Alert>}
        
        <Form className="add-damage-form" onSubmit={handleSubmit}>
          <Row className="r7">
            {[
              { label: 'Damage ID', name: 'damageId', type: 'text' },
              { label: 'Damage Date', name: 'damageDate', type: 'date' },
              { label: 'Damage Payment (Amount)', name: 'damagePayment', type: 'number' },
              { label: 'Hostel ID', name: 'hostelId', type: 'text' },
            ].map(({ label, name, type }) => (
              <Col md={6} key={name} className="col4">
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
<Row className="r7">
            <Col md={8} className="col4">
              <Form.Group controlId="damageDescription">
                <Form.Label>Damage Description</Form.Label>
                <Form.Control className='action2' 
                  as="textarea" 
                  name="damageDescription" 
                  value={formData.damageDescription} 
                  onChange={handleChange} 
                  rows="4"
                  isInvalid={!!formErrors.damageDescription}
                />
                <Form.Control.Feedback type="invalid">{formErrors.damageDescription}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            </Row>
            <Row className="r7">
            <Col md={8} className="col4">
              <Form.Group controlId="action">
                <Form.Label>Action Taken</Form.Label>
                <Form.Control className='action1' 
                  as="textarea" 
                  name="action" 
                  value={formData.action} 
                  onChange={handleChange} 
                  rows="3"
                  isInvalid={!!formErrors.action}
                />
                <Form.Control.Feedback type="invalid">{formErrors.action}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="form-actions">
              <Button type="submit" className="add-button">Add Damage</Button>
              <Button variant="danger" className="cancel-button" onClick={() => navigate('/damages')}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddDamage;
