import  { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";
import logo from '../../assets/logo.png';
import "./ApplyForm.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { prospectiveStudentSave } from "../../Service/studentService";


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
  const navigate=useNavigate();

  

  const [formData, setFormData] = useState({
  
    first_Name: "",
    last_Name: "",
    name_with_initials: "",
    national_id: "",
    gender: "",
    email: "",
    contact_number: "",
    faculty_name: "",
    student_Id: "",
    street: "",
    village: "",
    district: "",
    province: "",
    postal_code: "",
    distance_to_home: "",
    main_source_of_income: "",
    additional_source_of_income: "",
    number_of_family_members: "",
    number_of_siblings: "",
    number_of_siblings_edu: "",
    name_of_guardian: "",
    guardian_contact_number: "",
    annual_salary: "",
    status: "Pending",
    confirmInformation: false,
  });



  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};

    for (const [key, value] of Object.entries(formData)) {
      // Required field check
      if (typeof value === "string" && !value.trim()) { 
        const formattedKey = key.replace(/_/g, " ");
        errors[key] = `${formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)} is required`;
      } else if (typeof value === "boolean" && !value) {
        const formattedKey = key.replace(/_/g, " ");
        errors[key] = `${formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)} is required`;
      }
    }

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    // Contact number validation
    if (formData.contact_number && !/^\d{10}$/.test(formData.contact_number.trim())) {
      errors.contact_number = "Contact number must be 10 digits";
    }

    // Postal code validation
    if (formData.postal_code && !/^\d{5}$/.test(formData.postal_code.trim())) {
      errors.postal_code = "Postal code must be 5 digits";
    }

    // Annual salary validation
    if (formData.annual_salary && isNaN(formData.annual_salary.trim())) {
      errors.annual_salary = "Annual salary must be a number";
    }

    // Checkbox validation
    if (!formData.confirmInformation) {
      errors.confirmInformation = "You must confirm that the information is true and correct.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = (e) => {
  
    e.preventDefault();

    if (validateForm()) {
    //  console.log(formData)
    
    const username=sessionStorage.getItem("username");
    const password=sessionStorage.getItem("password");

         // Map form data to backend DTO structure
    const studentDto = {
      id: "", // Backend typically generates this
      firstName: formData.first_Name,
      lastName: formData.last_Name,
      nameWithInitials: formData.name_with_initials,
      nationalId: formData.national_id,
      gender: formData.gender,
      email: username,
      password: password,
      userRole: 0, // Default value for prospective students
      studentId: formData.student_Id,
      contactNumber: formData.contact_number,
      status: formData.status.toLowerCase(), // Ensure lowercase
      street: formData.street,
      village: formData.village,
      distanceToHome: parseFloat(formData.distance_to_home) || 0,
      district: formData.district,
      province: formData.province,
      postalCode: formData.postal_code,
      mainIncome: formData.main_source_of_income,
      additionalIncome: formData.additional_source_of_income,
      numberFamilyMembers: parseInt(formData.number_of_family_members, 10) || 0,
      numberOfSiblings: parseInt(formData.number_of_siblings, 10) || 0,
      numberOfSiblingsEdu: parseInt(formData.number_of_siblings_edu, 10) || 0,
      nameOfGuardian: formData.name_of_guardian,
      guardianContactNumber: formData.guardian_contact_number,
      facultyName: formData.faculty_name,
      annualSalary: parseFloat(formData.annual_salary) || 0,
    };

    console.log(studentDto)

    prospectiveStudentSave(studentDto).then((res)=>{
            console.log(res);
            if(res.data.status_code === 0){
              Swal.fire({
                title: "Success..!",
                text: "Form submitted successfuly..",
                icon: "success"
              });
              sessionStorage.clear();
              navigate("/");
              return;
            }else if(res.data.status_code === 1){
              Swal.fire({
                icon: "error",
                title: "Oops..!",
                text: "Can't Submit.. Please Re try!",
              });
            }
          })

      setFormSubmitted(true);
    } else {
      console.log("scsagr")
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
        <Row><Form.Label><b>Personal Details</b></Form.Label></Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="first_Name" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_Name"
                value={formData.first_Name}
                onChange={handleChange}
                isInvalid={!!formErrors.first_Name}
                placeholder="Ex: Sewwandi"
              />
              {formErrors.first_Name && <Alert variant="danger">{formErrors.first_Name}</Alert>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="last_Name" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_Name"
                value={formData.last_Name}
                onChange={handleChange}
                isInvalid={!!formErrors.last_Name}
                placeholder="Ex: Peiris"
              />
              {formErrors.last_Name && <Alert variant="danger">{formErrors.last_Name}</Alert>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="name_with_initials" className="mb-3">
              <Form.Label>Name with Initials</Form.Label>
              <Form.Control
                type="text"
                name="name_with_initials"
                value={formData.name_with_initials}
                onChange={handleChange}
                isInvalid={!!formErrors.name_with_initials}
                placeholder="Ex: H. S. K. Peiris"
              />
              {formErrors.name_with_initials && <Alert variant="danger">{formErrors.name_with_initials}</Alert>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="national_id" className="mb-3">
              <Form.Label>National ID</Form.Label>
              <Form.Control
                type="text"
                name="national_id"
                value={formData.national_id}
                onChange={handleChange}
                isInvalid={!!formErrors.national_id}
                placeholder="Ex: XXXXXXXXXXX"
              />
              {formErrors.national_id && <Alert variant="danger">{formErrors.national_id}</Alert>}
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange} isInvalid={!!formErrors.gender} >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              {formErrors.gender && <Alert variant="danger">{formErrors.gender}</Alert>}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="faculty_name" className="mb-3">
              <Form.Label>Faculty Name</Form.Label>
              <Form.Select
                className="custom-formcontrol1"
                name="faculty_name"
                value={formData.faculty_name}
                onChange={handleChange}
                isInvalid={!!formErrors.faculty_name}
              >
                <option value="" disabled>Select Faculty</option>
                <option value="Commerce and Management Studies">Commerce and Management Studies</option>
                <option value="Computing and Technology">Computing and Technology</option>
                <option value="Medicine">Medicine</option>
                <option value="Humanities">Humanities</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Science">Science</option>
              </Form.Select>
              {formErrors.faculty_name && (
                <Alert variant="danger" className="mt-2">
                  {formErrors.faculty_name}
                </Alert>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="student_Id" className="mb-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="student_Id"
                value={formData.student_Id}
                onChange={handleChange}
                isInvalid={!!formErrors.student_Id}
                placeholder="Ex: PS/20XX/XXX"
              />
              {formErrors.student_Id && <Alert variant="danger">{formErrors.student_Id}</Alert>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
                placeholder="Ex: peiris-ps20123@stu.kln.ac.lk"
              />
              {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contact_number" className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                isInvalid={!!formErrors.contact_number}
                placeholder="Ex: 07XXXXXXXX"
              />
              {formErrors.contact_number && (
                <Alert variant="danger">{formErrors.contact_number}</Alert>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row><Form.Label><b>Address Details</b></Form.Label></Row>
        <Row>

          <Col md={4}>
            <Form.Group controlId="street" className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                isInvalid={!!formErrors.street}
                placeholder="Ex: No 12,Main Street"
              />
              {formErrors.street && <Alert variant="danger">{formErrors.street}</Alert>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="village" className="mb-3">
              <Form.Label>Village</Form.Label>
              <Form.Control
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                isInvalid={!!formErrors.village}
                placeholder="Ex: Nadugala"
              />
              {formErrors.village && <Alert variant="danger">{formErrors.village}</Alert>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="province" className="mb-3">
              <Form.Label>Province</Form.Label>
              <Form.Select
                name="province"
                value={formData.province}
                onChange={handleChange}
                isInvalid={!!formErrors.province}
              >
                <option value="" disabled>Select Province</option>
                {provinceOptions.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Form.Select>
              {formErrors.province && <Alert variant="danger">{formErrors.province}</Alert>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="district" className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Select
                name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={!formData.province}
                isInvalid={!!formErrors.district}
              >
                <option value="" disabled>Select District</option>
                {districtOptions.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Form.Select>
              {formErrors.district && <Alert variant="danger">{formErrors.district}</Alert>}
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="postal_code" className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                isInvalid={!!formErrors.postal_code}
                placeholder="Ex: XXXXX"
              />
              {formErrors.postal_code && <Alert variant="danger">{formErrors.postal_code}</Alert>}
            </Form.Group>
          </Col>
        </Row>
        <Row><Form.Label><b>Additional Details</b></Form.Label></Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="distance_to_home" className="mb-3">
              <Form.Label>Distance to Home (km)</Form.Label>
              <Form.Control
                type="text"
                name="distance_to_home"
                value={formData.distance_to_home}
                onChange={handleChange}
                isInvalid={!!formErrors.distance_to_home}
                placeholder="Ex: 163"
              />
              {formErrors.distance_to_home && (
                <Alert variant="danger">{formErrors.distance_to_home}</Alert>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="main_source_of_income" className="mb-3">
              <Form.Label>Main source of income</Form.Label>
              <Form.Control
                type="text"
                name="main_source_of_income"
                value={formData.main_source_of_income}
                onChange={handleChange}
                isInvalid={!!formErrors.main_source_of_income}
                placeholder="Ex: Father - Doctor"
              />
              {formErrors.main_source_of_income && (
                <Alert variant="danger">{formErrors.main_source_of_income}</Alert>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="additional_source_of_income" className="mb-3">
              <Form.Label>Additional source of income</Form.Label>
              <Form.Control
                type="text"
                name="additional_source_of_income"
                value={formData.additional_source_of_income}
                onChange={handleChange}
                isInvalid={!!formErrors.additional_source_of_income}
                placeholder="Ex: Small Business"
              />
              {formErrors.additional_source_of_income && (
                <Alert variant="danger">{formErrors.additional_source_of_income}</Alert>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="annual_salary" className="mb-3">
              <Form.Label>Total Annual Salary (Rs)</Form.Label>
              <Form.Control
                type="text"
                name="annual_salary"
                value={formData.annual_salary}
                onChange={handleChange}
                isInvalid={!!formErrors.annual_salary}
                placeholder="Ex: 450000.00"
              />
              {formErrors.annual_salary && (
                <Alert variant="danger">{formErrors.annual_salary}</Alert>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="number_of_family_members" className="mb-3">
              <Form.Label>Number of family members</Form.Label>
              <Form.Control
                type="text"
                name="number_of_family_members"
                value={formData.number_of_family_members}
                onChange={handleChange}
                isInvalid={!!formErrors.number_of_family_members}
              />
              {formErrors.number_of_family_members && (
                <Alert variant="danger">{formErrors.number_of_family_members}</Alert>
              )}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="number_of_siblings" className="mb-3">
              <Form.Label>Number of siblings</Form.Label>
              <Form.Control
                type="text"
                name="number_of_siblings"
                value={formData.number_of_siblings}
                onChange={handleChange}
                isInvalid={!!formErrors.number_of_siblings}
              />
              {formErrors.number_of_siblings && (
                <Alert variant="danger">{formErrors.number_of_siblings}</Alert>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="number_of_siblings_edu" className="mb-3">
              <Form.Label>Number of siblings who study at School or University</Form.Label>
              <Form.Control
                type="text"
                name="number_of_siblings_edu"
                value={formData.number_of_siblings_edu}
                onChange={handleChange}
                isInvalid={!!formErrors.number_of_siblings_edu}
              />
              {formErrors.number_of_siblings_edu && (
                <Alert variant="danger">{formErrors.number_of_siblings_edu}</Alert>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="name_of_guardian" className="mb-3">
              <Form.Label>Name of the guardian</Form.Label>
              <Form.Control
                type="text"
                name="name_of_guardian"
                value={formData.name_of_guardian}
                onChange={handleChange}
                isInvalid={!!formErrors.name_of_guardian}
                placeholder="Ex: Father - A. B. C. Silva"
              />
              {formErrors.name_of_guardian && (
                <Alert variant="danger">{formErrors.name_of_guardian}</Alert>
              )}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="guardian_contact_number" className="mb-3">
              <Form.Label>Contact of the guardian</Form.Label>
              <Form.Control
                type="text"
                name="guardian_contact_number"
                value={formData.guardian_contact_number}
                onChange={handleChange}
                isInvalid={!!formErrors.guardian_contact_number}
                placeholder="Ex: 07XXXXXXXX"
              />
              {formErrors.guardian_contact_number && (
                <Alert variant="danger">{formErrors.guardian_contact_number}</Alert>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="confirmInformation" className="mb-3">
            <Form.Check
              type="checkbox"
              label="I confirm that the information provided is true and correct."
              name="confirmInformation"
              checked={formData.confirmInformation}
              onChange={handleChange}
            />
            {formErrors.confirmInformation && (
              <Alert variant="danger">{formErrors.confirmInformation}</Alert>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Col md={4} className="col1"><Button variant="primary" type="submit" className="custom-button4">Submit</Button></Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ApplyForm;


