import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Tool from '../../Components/Tool';
import SideBar from '../../Components/SideBar';
import './Add_Hostel.css';
import {addHostel} from "../../Service/adminService.js";
import Swal from "sweetalert2";

const AddHostel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostel_name: '',
    location: '',
    contract_fee: '',
    total_rooms: '',
    total_capacity: '',
    filled_capacity: '',

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

    setFormSubmitted(true);
    const hostelDto={
      id:"",
      hostel_name:formData.hostel_name,
      location:formData.location,
      contract_fee:formData.contract_fee,
      total_rooms:formData.total_rooms,
      total_capacity:formData.total_capacity,
      filled_capacity:formData.filled_capacity,
      available_capacity:""
    }
    console.log(hostelDto)
    const token = sessionStorage.getItem("token");
    addHostel(token,hostelDto).then((res)=>{
      if(res.data.status_code=== 0){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Hostel saved success..",
          showConfirmButton: false,
          timer: 3000
        });
      }else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something error..",
          showConfirmButton: false,
          timer: 3000
        });
      }
    })

    navigate('/hostel');
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
              { label: 'Hostel Name', name: 'hostel_name', type: 'text' },
              { label: 'Location', name: 'location', type: 'text' },
              { label: 'Contract Fee', name: 'contract_fee', type: 'number' },
              { label: 'Total Capacity', name: 'total_capacity', type: 'number' },
              { label: 'Filled Capacity', name: 'filled_capacity', type: 'number' },
              { label: 'Total Room', name: 'total_rooms', type: 'number' },
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
