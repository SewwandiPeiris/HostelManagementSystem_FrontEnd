import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Tool from '../../Components/Tool';
import SideBar from '../../Components/SideBar';
import Swal from 'sweetalert2';
import './Add_Damage_Case.css';
import {addDamageCase, getAllDamageMaster, getAllHostel} from "../../Service/adminService.js";

const AddDamageCase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelId: '',
    penalty_price: '',
    damageMasterId: '',
    studentId:''
  });

  const [hostels, setHostels] = useState([]);
  const [damageMaster, setDamageMaster] = useState([]);
  const [selectedHostelId, setSelectedHostelId] = useState("");
  const [selectedDamageId, setSelectedDamagelId] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  // const validateForm = () => {
  //   let errors = {};
  //   Object.keys(formData).forEach((key) => {
  //     if (!formData[key]) {
  //       errors[key] = 'This field is required';
  //     }
  //   });
  //   return errors;
  // };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getAllHostel(token)
        .then((res)=>{
          setHostels(res.data.content)

        })

    getAllDamageMaster(token).then((res)=>{
      setDamageMaster(res.data.content);
    })
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // e.preventDefault();
    // const errors = validateForm();
    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    setFormSubmitted(true);
    console.log('Damage Case Data:', formData);

    const damageCaseDto={

      id: "",
      hostelId:selectedHostelId,
      penalty_price:formData.penalty_price,
      payment_status: "pending",
      damageMasterId:selectedDamageId,
      studentId:formData.studentId
    }

    console.log(damageCaseDto)
    const token = sessionStorage.getItem("token");
    addDamageCase(token,damageCaseDto).then((res)=>{
      if(res.data.status_code=== 0){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Damage Case add success..",
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

    // Show success message


    // Redirect to damages list

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

              { label: 'Student ID', name: 'studentId', type: 'text' },
              { label: 'Penalty Payment', name: 'penalty_price', type: 'number' },
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
                <Form.Select
                    className="custom-input7"
                    size="sm"
                    value={selectedHostelId}
                    onChange={(e) => setSelectedHostelId(e.target.value)}
                >

                  <option value="" disabled={true} > Select a Hostel </option>
                  {hostels.length > 0 &&
                      hostels.map((hostel) => (
                          <option key={hostel.id} value={hostel.id}>
                            {hostel.hostel_name}
                          </option>
                      ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{formErrors.paymentStatus}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} className="col3">
              <Form.Group controlId="paymentStatus">
                <Form.Select
                    className="custom-input7"
                    size="sm"
                    value={selectedDamageId}
                    onChange={(e) => setSelectedDamagelId(e.target.value)}
                >

                  <option value="" disabled={true} > Select a Damage Master </option>
                  {damageMaster.length > 0 &&
                      damageMaster.map((damage) => (
                          <option key={damage.id} value={damage.id}>
                            {damage.id+ " - "+ damage.description}
                          </option>
                      ))}
                </Form.Select>
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
