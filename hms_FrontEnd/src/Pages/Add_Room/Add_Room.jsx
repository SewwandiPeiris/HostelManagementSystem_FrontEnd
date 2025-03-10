import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Tool from '../../Components/Tool';
import SideBar from '../../Components/SideBar';
import { addRoom, getAllHostel } from "../../Service/adminService.js";
import Swal from "sweetalert2";
import './Add_Room.css';

const AddRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomId: '',
    hostel_id: '',
    room_capacity: '',
    filled_capacity: '',
    remark: '',
  });
  const [hostels, setHostelList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getAllHostel(token)
      .then((res) => {
        setHostelList(res.data.content);
      })
      .catch((error) => {
        console.error("Error fetching hostel data:", error);
      });
  }, []);

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
    const token = sessionStorage.getItem("token");
    addRoom(token, formData).then((res) => {
      if (res.data.status_code === 0) {
        Swal.fire({
          title: "SUCCESS..!",
          text: "Room Add Success...",
          icon: "success"
        });
        navigate("/room");
      } else if (res.data.status_code === 1) {
        Swal.fire({
          icon: "error",
          title: "OOPS..!",
          text: "Can't Submit.. Please Re try!",
        });
      } else if (res.data.status_code === 3) {
        Swal.fire({
          icon: "error",
          title: "OOPS..!",
          text: "This Room already exists.. Please Re try!",
        });
      }
    });
  };

  return (
    <>
      <Tool />
      <SideBar/>
      <Container className="add-hostel-container mt-4">
        <h2 className="add-hostel-title">Add Room</h2>
        {formSubmitted && <Alert variant="success">Form submitted successfully!</Alert>}
        <Form className="add-hostel-form" onSubmit={handleSubmit}>
          <Row>
            {[
              { label: 'Room ID', name: 'roomId', type: 'text' },
              { label: 'Room Capacity', name: 'room_capacity', type: 'number' },
              { label: 'Filled Capacity', name: 'filled_capacity', type: 'number' },
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
              <Form.Group controlId="hostel_id">
                <Form.Label>Hostel</Form.Label>
                <Form.Control 
                  as="select" 
                  name="hostel_id" 
                  value={formData.hostel_id} 
                  onChange={handleChange} 
                  isInvalid={!!formErrors.hostel_id}
                >
                  <option value="">Select a Hostel</option>
                  {hostels.map((hostel) => (
                    <option key={hostel.id} value={hostel.id}>{hostel.hostel_name}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{formErrors.hostel_id}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={8} className="col4">
              <Form.Group controlId="remark">
                <Form.Label>Remarks</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  name="remark" 
                  value={formData.remark} 
                  onChange={handleChange} 
                  isInvalid={!!formErrors.remark} 
                />
                <Form.Control.Feedback type="invalid">{formErrors.remark}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="form-actions">
              <Button type="submit" className="submit-button2">Add Room</Button>
              <Button variant="secondary" className="cancel-button" onClick={() => navigate('/room')}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddRoom;
