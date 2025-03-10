import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal and Form from react-bootstrap
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';
import './Room.css';
import { getAllRooms } from "../../Service/adminService.js";

const Room = () => {
  const navigate = useNavigate();

  const [rooms, setRoomList] = useState([]);
  const [modalShow, setModalShow] = useState(false); // State to control modal visibility
  const [selectedRoom, setSelectedRoom] = useState({
    id: '',
    roomId: '',
    room_capacity: '',
    filled_capacity: '',
    remark: '',
    hostel_id: '',
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    getAllRooms(token).then((res) => {
      console.log(res.data.content);
      setRoomList(res.data.content);
    }).catch((error) => {
      console.error("Error fetching room data:", error);
    });
  }, []);

  const navigateToAddRoom = () => {
    navigate('/add_room');
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room); // Set the selected room data
    setModalShow(true); // Open the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
  const token = sessionStorage.getItem("token");

  updateRoom(selectedRoom.id, selectedRoom) 
    .then(() => {
      setModalShow(false); 
      getAllRooms(token).then((res) => {
        setRoomList(res.data.content);
      });
    })
    .catch((error) => {
      console.error("Error saving room data:", error);
    });
};


  return (
    <>
      <SideBar />
      <Tool />

      <div className="hostel-rooms-container">
        <h2 className="hostel-rooms-title">Room Details</h2>
        <div className="hostel-rooms-header">
        <button
          className="add-room-button"
          onClick={navigateToAddRoom}
        >
          Add Room
        </button>
        </div>
        <table className="hostel-table">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Hostel</th>
              <th>Room Capacity</th>
              <th>Filled Capacity</th>
              <th>Available Capacity</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomId}</td>
                  <td>{room.hostelDetail.id + " - " + room.hostelDetail.hostel_name}</td>
                  <td>{room.room_capacity}</td>
                  <td>{room.filled_capacity}</td>
                  <td>{room.room_capacity - room.filled_capacity}</td>
                  <td>{room.remark}</td>
                  <td>
                    <button className="action-btn edit-btn" onClick={() => handleEditClick(room)}></button>
                  
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

      {/* Modal for editing room */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="custom-modal1">Edit Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal2">
          {selectedRoom && (
            <>
              <Form.Group>
                <Form.Label>Room ID</Form.Label>
                <Form.Control
                  type="text"
                  name="roomId"
                  value={selectedRoom.roomId}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Room Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="room_capacity"
                  value={selectedRoom.room_capacity}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Filled Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="filled_capacity"
                  value={selectedRoom.filled_capacity}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  type="text"
                  name="remark"
                  value={selectedRoom.remark}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hostel ID</Form.Label>
                <Form.Control
                  type="text"
                  name="hostel_id"
                  value={selectedRoom.hostel_id}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="custom-modal3">
          <Button className="save-button" variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Room;
