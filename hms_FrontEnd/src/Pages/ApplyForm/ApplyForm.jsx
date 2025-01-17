import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";
import logo from '../../assets/logo.png';
import "./ApplyForm.css";

const ApplyForm = () => {
  const sriLankaProvinces = {
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern Province": ["Galle", "Matara", "Hambantota"],
    "Northern Province": ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu"],
    "Eastern Province": ["Batticaloa", "Trincomalee", "Ampara"],
    "North Western Province": ["Kurunegala", "Puttalam"],
    "North Central Province": ["Anuradhapura", "Polonnaruwa"],
    "Uva Province": ["Badulla", "Monaragala"],
    "Sabaragamuwa Province": ["Ratnapura", "Kegalle"],
  };

  const [formData, setFormData] = useState({
    first_Name: "",
    last_Name: "",
    national_id: "",
    gender: "",
    email: "",
    student_Id: "",
    contact_number: "",
    faculty_name: "",
    street: "",
    village: "",
    district: "",
    province: "",
    postal_code: "",
    distance_to_home: "",
    main_source_of_income: "",
    additional_source_of_income: "",
    number_of_family_members: "",
    number_of_cousins: "",
    number_of_cousins_who_go_to_school_or_university: "",
    annual_salary: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        errors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.contact_number && !/^\d{10}$/.test(formData.contact_number)) {
      errors.contact_number = "Contact number must be 10 digits";
    }

    if (formData.postal_code && !/^\d{5}$/.test(formData.postal_code)) {
      errors.postal_code = "Postal code must be 5 digits";
    }

    if (formData.annual_salary && isNaN(formData.annual_salary)) {
      errors.annual_salary = "Annual salary must be a number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);

      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
  };

  const provinceOptions = Object.keys(sriLankaProvinces);
  const districtOptions = formData.province ? sriLankaProvinces[formData.province] : [];

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
          {/* First Name */}
          <Col md={6}>
            <Form.Group controlId="first_Name" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_Name"
                value={formData.first_Name}
                onChange={handleChange}
              />
              {formErrors.first_Name && <Alert variant="danger">{formErrors.first_Name}</Alert>}
            </Form.Group>
          </Col>

          {/* Last Name */}
          <Col md={6}>
            <Form.Group controlId="last_Name" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_Name"
                value={formData.last_Name}
                onChange={handleChange}
              />
              {formErrors.last_Name && <Alert variant="danger">{formErrors.last_Name}</Alert>}
            </Form.Group>
          </Col>

          {/* National ID */}
          <Col md={6}>
            <Form.Group controlId="national_id" className="mb-3">
              <Form.Label>National ID</Form.Label>
              <Form.Control
                type="text"
                name="national_id"
                value={formData.national_id}
                onChange={handleChange}
              />
              {formErrors.national_id && <Alert variant="danger">{formErrors.national_id}</Alert>}
            </Form.Group>
          </Col>

          {/* Gender */}
          <Col md={6}>
            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              {formErrors.gender && <Alert variant="danger">{formErrors.gender}</Alert>}
            </Form.Group>
          </Col>

          {/* Email */}
          <Col md={6}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
            </Form.Group>
          </Col>

          {/* Contact Number */}
          <Col md={6}>
            <Form.Group controlId="contact_number" className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
              />
              {formErrors.contact_number && (
                <Alert variant="danger">{formErrors.contact_number}</Alert>
              )}
            </Form.Group>
          </Col>

          {/* Faculty Name */}
          <Col md={6}>
            <Form.Group controlId="faculty_name" className="mb-3">
              <Form.Label>Faculty Name</Form.Label>
              <Form.Control
                type="text"
                name="faculty_name"
                value={formData.faculty_name}
                onChange={handleChange}
              />
              {formErrors.faculty_name && <Alert variant="danger">{formErrors.faculty_name}</Alert>}
            </Form.Group>
          </Col>

          {/* Street */}
          <Col md={6}>
            <Form.Group controlId="street" className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
              {formErrors.street && <Alert variant="danger">{formErrors.street}</Alert>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="village" className="mb-3">
              <Form.Label>Village</Form.Label>
              <Form.Control
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
              />
              {formErrors.village && <Alert variant="danger">{formErrors.village}</Alert>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="postal_code" className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
              />
              {formErrors.postal_code && <Alert variant="danger">{formErrors.postal_code}</Alert>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="province" className="mb-3">
              <Form.Label>Province</Form.Label>
              <Form.Select
                name="province"
                value={formData.province}
                onChange={handleChange}
              >
                <option value="">Select Province</option>
                {provinceOptions.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Form.Select>
              {formErrors.province && <Alert variant="danger">{formErrors.province}</Alert>}
            </Form.Group>
          </Col>

          <Col md={6}>
          <Form.Group controlId="district" className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Select
                name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={!formData.province}
              >
                <option value="">Select District</option>
                {districtOptions.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Form.Select>
              {formErrors.district && <Alert variant="danger">{formErrors.district}</Alert>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="distance_to_home" className="mb-3">
              <Form.Label>Distance to Home</Form.Label>
              <Form.Control
                type="text"
                name="distance_to_home"
                value={formData.distance_to_home}
                onChange={handleChange}
              />
              {formErrors.distance_to_home && (
                <Alert variant="danger">{formErrors.distance_to_home}</Alert>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="main_source_of_income" className="mb-3">
              <Form.Label>Main source of income</Form.Label>
              <Form.Control
                type="text"
                name="main_source_of_income"
                value={formData.main_source_of_income}
                onChange={handleChange}
              />
              {formErrors.main_source_of_income&& (
                <Alert variant="danger">{formErrors.main_source_of_income}</Alert>
              )}
            </Form.Group>
          </Col>

        </Row>
      

        <Button variant="primary" type="submit" className="custom-button2">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ApplyForm;


