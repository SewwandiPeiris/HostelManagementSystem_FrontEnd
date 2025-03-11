import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Tool from '../../Components/Tool';
import SideBar from '../../Components/SideBar';
import Swal from 'sweetalert2';
import './Add_Damage.css';
import {addDamageMaster} from "../../Service/adminService.js";

const AddDamage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    damage_date: '',
    damage_price: '',
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

    // const errors = validateForm();
    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    // setFormSubmitted(true);
    console.log('Damage Form Data:', formData);

    const masterDto={
      id:"",
      description:formData.description,
      damage_date:formData.damage_date,
      damage_price:formData.damage_price
    }
    const token = sessionStorage.getItem("token");
    addDamageMaster(token,masterDto).then((res)=>{
      if(res.data.status_code=== 0){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Damage Master add success..",
          showConfirmButton: false,
          timer: 2500
        });
        navigate('/damage');
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



    // Redirect to damages list

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
            <Col md={8} className="col4">
              <Form.Group controlId="description">
                <Form.Label>Damage Description</Form.Label>
                <Form.Control className='action2'
                              as="textarea"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              rows="4"
                              isInvalid={!!formErrors.description}
                />
                <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="r7">
            {[
              { label: 'Damage Date', name: 'damage_date', type: 'date' },
              { label: 'Damage Payment (Amount)', name: 'damage_price', type: 'number' },

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
