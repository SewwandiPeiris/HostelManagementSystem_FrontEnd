import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ApplyForm.css";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
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
