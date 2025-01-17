import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css";
import "./ApplyForm.css";
import logo from 'C:/Users/Sewwandi/Desktop/Front_End/HSM_Frontend/hms_FrontEnd/src/assets/logo.png';


const ApplyForm = () => {
  const [formData, setFormData] = useState({
    national_id: "",
    first_Name: "",
    last_Name: "",
    gender: "",
    email: "",
    password: "",
    student_Id: "",
    contact_number: "",
    address: "",
    distance: "",
    annual_salary: "",
    faculty_name: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear error on input change
  };

  const validateForm = () => {
    const errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        errors[key] = `${key} is required`;
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);

      // Reset form after submission
      setFormData({
        national_id: "",
        first_Name: "",
        last_Name: "",
        gender: "",
        email: "",
        password: "",
        studentId: "",
        contact_number: "",
        address: "",
        distance: "",
        annual_salary: "",
        faculty_name: "",
      });

      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
  };

  return (
    <Container className="form-container mt-4">
      <div className="footer-left">
      <Image alt="Logo" src={logo} fluid className="brand-logo1" />
        <div className="footer-title">
            <span className="university-of">University of</span>
            <br />
            <span className="kelaniya">Kelaniya</span>
          </div>
      </div>
      <h2 className="custom-h21">Hostel Apply Form</h2>
      {formSubmitted && <Alert variant="success">Form submitted successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {Object.keys(formData).slice(0, 6).map((field) => (
              <Form.Group controlId={field} className="mb-3" key={field}>
                <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                <Form.Control
                  className="custom-formcontrol1"
                  type={field === "password" ? "password" : "text"}
                  placeholder={`Enter ${field.replace(/_/g, " ").toLowerCase()}`}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {formErrors[field] && (
                  <Alert variant="danger" className="mt-2">
                    {formErrors[field]}
                  </Alert>
                )}
              </Form.Group>
            ))}
          </Col>

          <Col md={6}>
            {Object.keys(formData).slice(6).map((field) => (
              <Form.Group controlId={field} className="mb-3" key={field}>
                <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                <Form.Control
                  className="custom-formcontrol1"
                  type={field === "annualSalary" ? "number" : "text"}
                  placeholder={`Enter ${field.replace(/_/g, " ").toLowerCase()}`}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {formErrors[field] && (
                  <Alert variant="danger" className="mt-2">
                    {formErrors[field]}
                  </Alert>
                )}
              </Form.Group>
            ))}
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="custom-button2">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ApplyForm;
