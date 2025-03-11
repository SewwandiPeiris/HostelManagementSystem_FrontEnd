import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Tool from '../../Components/Tool';
import SideBar from '../../Components/SideBar';
import Swal from 'sweetalert2';
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
    console.log('Damage Case Data:', formData);

    // Show success message
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Damage case added successfully!',
      showConfirmButton: false,
      timer: 3000
    });

    // Redirect to damages list
    navigate('/damage');
  };

  return (
    <>
      <Tool />
      <SideBar/>
      <Container className="add-damage-case-container mt-4">
        <h2 className="add-damage-case-title">Add Damage Case</h2>
        {formSubmitted && <Alert variant="success">Damage case added successfully!</Alert>}
        
        <Form className="add-damage-case-form" onSubmit={handleSubmit}>
          <Row>
            {[
              { label: 'Damage Case ID', name: 'damageCaseId', type: 'text' },
              { label: 'Damage ID', name: 'damageId', type: 'text' },
              { label: 'Student ID', name: 'studentId', type: 'text' },
              { label: 'Penalty Payment', name: 'penaltyPayment', type: 'number' },
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
            <Col md={6} className="col3">
              <Form.Group controlId="paymentStatus">
                <Form.Label>Payment Status</Form.Label>
                <Form.Control 
                  as="select" 
                  name="paymentStatus" 
                  value={formData.paymentStatus} 
                  onChange={handleChange} 
                  isInvalid={!!formErrors.paymentStatus}
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Pending">Pending</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{formErrors.paymentStatus}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="form-actions">
              <Button type="primary" className="add-button">Add Damage Case</Button>
              <Button variant="danger" className="cancel-button" onClick={() => navigate('/damages')}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddDamageCase;
