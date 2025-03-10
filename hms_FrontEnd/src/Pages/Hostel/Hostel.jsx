import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from 'react-bootstrap';

import "./Hostel.css";
import { getAllHostel } from "../../Service/adminService.js";

const Hostel = () => {
  const navigate = useNavigate();

  const [hostals, setHostelList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    getAllHostel(token)
        .then((res) => {
          console.log(res.data.content);
          setHostelList(res.data.content); 
        })
        .catch((error) => {
          console.error("Error fetching hostel data:", error);
        });
  }, []);

  const navigateToAddHostel = () => {
    navigate('/add_hostel');
  };

  const handleEditHostel = (hostal) => {
    setSelectedHostel(hostal);
    setModalShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedHostel((prevHostel) => ({ ...prevHostel, [name]: value }));
  };

  const handleUpdateHostel = () => {
    updateHostel(selectedHostel.id, selectedHostel)
      .then(() => {
        setModalShow(false);
        setHostals((prevHostels) => prevHostels.map(hostal => 
          hostal.id === selectedHostel.id ? selectedHostel : hostal
        ));
      })
      .catch((error) => {
        console.error("Error updating hostel:", error);
      });
  };

  const updateHostel = (id, data) => {
    // Implement your API call here
    return axios.put(`/api/hostels/${id}`, data);
  };

  return (
    <>
      <SideBar />
      <Tool />
      <div className="hostels-container">
        <h1 className="hostels-title">Hostel Details</h1>
        <div className="hostels-header">
          <button 
            className="add-hostel-button" 
            onClick={navigateToAddHostel}
          >
            Add Hostel
          </button>
        </div>
        <table className="hostels-table">
          <thead>
            <tr>
              <th>Hostel ID</th>
              <th>Hostel Name</th>
              <th>Location</th>
              <th>Contract Fee</th>
              <th>Total Rooms</th>
              <th>Total Capacity</th>
              <th>Filled Capacity</th>
              <th>Available Capacity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hostals.length > 0 ? (
              hostals.map((hostal) => (
                <tr key={hostal.id}>
                  <td>{hostal.id}</td>
                  <td>{hostal.hostel_name}</td>
                  <td>{hostal.location}</td>
                  <td>{hostal.contract_fee}</td>
                  <td>{hostal.total_rooms}</td>
                  <td>{hostal.total_capacity}</td>
                  <td>{hostal.filled_capacity}</td>
                  <td>{hostal.available_capacity}</td>
                  <td>
                    <button className="action-btn edit-btn" onClick={() => handleEditHostel(hostal)}></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="custom-modal1">Edit Hostel Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal2">
          {selectedHostel && (
            <>
              <Form.Group>
                <Form.Label>Hostel Name</Form.Label>
                <Form.Control type="text" name="hostel_name" value={selectedHostel.hostel_name} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={selectedHostel.location} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contract Fee</Form.Label>
                <Form.Control type="text" name="contract_fee" value={selectedHostel.contract_fee} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Total Rooms</Form.Label>
                <Form.Control type="number" name="total_rooms" value={selectedHostel.total_rooms} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Total Capacity</Form.Label>
                <Form.Control type="number" name="total_capacity" value={selectedHostel.total_capacity} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Filled Capacity</Form.Label>
                <Form.Control type="number" name="filled_capacity" value={selectedHostel.filled_capacity} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Available Capacity</Form.Label>
                <Form.Control type="number" name="available_capacity" value={selectedHostel.available_capacity} onChange={handleInputChange} />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="custom-modal3">
          <Button className="save-button" variant="primary" onClick={handleUpdateHostel}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Hostel;
