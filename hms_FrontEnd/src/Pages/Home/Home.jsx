import React, { useState } from "react";
import { Card, Button, Modal, Navbar, Carousel } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import buildingImage from '../../assets/image3.jpg';
import buildingImage1 from '../../assets/Hostel.jpg';
import buildingImage2 from '../../assets/image2.jpg';
import facilityImage from '../../assets/Facility.jpg';
import hostelImage from '../../assets/Hostel.jpg';
import selectionImage from '../../assets/Selection.jpg';
import './Home.css';



const Home= () => {
    // State for controlling the modal
    const [show, setShow] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
  
    // Card data (you can replace this with dynamic data)
    const cardData = [
      {
        title: "Hostels",
        image: hostelImage,
        description:
         (<>
            <p>The University of Kelaniya, located in Sri Lanka, has several hostels
            that provide accommodation for its students.</p> Below is a general overview
            of the hostels, their locations, and some selection criteria that might be used.
            <ul>
            <li>
              <strong>Female Hostels:</strong>
              <ul>
                <li>
                  <strong>Bandaranayaka (Main Hostel):</strong> Located within the university campus,
                  this hostel typically accommodates male students who are enrolled in full-time degree programs.
                </li>
                <li>
                  <strong>Bullugaha:</strong> Another male hostel located on or near the campus,
                  offering similar facilities to Hostel A.
                </li>
              </ul>
            </li>
            <li>
              <strong>Male Hostels:</strong>
              <ul>
                <li>
                  <strong>CWW Kannangara (Main Female Hostel):</strong> Located within close proximity to the university,
                  Hostel is for female students who come from outside the region and require on-campus accommodation.
                </li>
                <li>
                  <strong>Maharagama:</strong> Another female hostel with facilities for students in need of university accommodations.
                </li>
              </ul>
            </li>
            <li>
              <strong>Other Hostels:</strong>
              <ul>
                <li>
                  The university may also have temporary or additional hostels for specific academic programs, sports participants,
                  or for students with special needs.
                </li>
              </ul>
            </li>
            </ul>
         </>),
      },
      
      {
        title: "Facilities",
        image: facilityImage,
        description:
          (<>
           <p>Our hostels offer a wide range of modern amenities designed to provide residents with a comfortable, secure, 
           and convenient living experience.</p> Enjoy free high-speed Wi-Fi throughout the premises, allowing you to stay connected 
           for both academic and personal needs. Safety is a top priority, with 24/7 security surveillance, gated entrances, 
           and on-site security personnel to ensure a secure environment.<br/>
           The rooms are spacious and well-furnished with comfortable beds, individual storage spaces, and study desks to 
           cater to your needs. Bathrooms are clean, hygienic, and regularly maintained, offering both hot and cold water 
           facilities. Common areas are designed to foster a sense of community, with shared lounges for relaxation, study 
           rooms for group work, and recreational areas for leisure activities.<br/>
           Dining facilities provide nutritious and freshly prepared meals, with options to suit various dietary preferences. 
           Additional amenities include laundry facilities, ample parking spaces, and easy access to nearby medical and convenience 
           stores. With these thoughtful features, our hostels ensure a peaceful and enjoyable stay for all residents.
          </>),
      },
      {
        title: "Selection Criteria",
        image: selectionImage,
        description:
          (<>
            <p>The hostel selection process at the University of Kelaniya generally
            follows these criteria:</p>
           <ul>
            <li><strong>Distance from the University:</strong>Preference is often given to students who live the furthest from the university.</li>
            <li><strong>Academic Performance:</strong> Students with higher academic performance or those who meet specific academic criteria may be prioritized.</li>
            <li><strong>Financial Need:</strong> Students from economically disadvantaged backgrounds may be given preference to ensure equitable access to hostel accommodation.</li>
            <li><strong>Special Requirements:</strong> Students with disabilities or special medical conditions may be given priority.</li>
            <li><strong>Availability:</strong> The number of students seeking accommodation versus the available space in hostels also plays a role.</li>
           </ul>
          </>),
      },
    ];
  
    // Function to handle opening the modal
    const handleShow = (title, description) => {
      setCurrentTitle(title);
      setCurrentDescription(description);
      setShow(true);
    };
  //<img src={buildingImage} alt="Hostel Building" className="img-fluid" />
    // Function to close the modal
    const handleClose = () => {
      setShow(false);
    };
  return (
    <>
     <Header/>

     <div className="home-container">

     <Carousel interval={3000}>
      <Carousel.Item>
        <img
          className="background-image"
          src={buildingImage}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="background-image"
          src={buildingImage1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="background-image"
          src={buildingImage2}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
     </Carousel>  
      
      
      <div className="content-box p-4 rounded shadow">
        <h1 className="custom-color">HMS</h1>
        <h2 className="custom-color1">Hostel Management System</h2>
        <h3 className="custom-color2 ">Welcome to Our Hostel!</h3>
        <p>
          Experience comfort and convenience in a safe and welcoming environment. 
          Our hostel offers modern facilities, spacious rooms, and a vibrant community, 
          designed to make you feel at home.Whether you're here for studies or work, 
          we ensure a peaceful stay with all the amenities you need.
        </p>
      </div>
     </div>

     <Navbar className="custom-navbar2" expand="lg">
        <Navbar.Brand className="custom-color3" href="/">About Hostels</Navbar.Brand>
     </Navbar>

      <div className="row">
        {cardData.map((card, index) => (
          <div className="col-md-5" key={index}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title className="custom-card1">{card.title}</Card.Title>
                <Card.Img variant="top" src={card.image} alt={card.title} />
                <Card.Text>
                  {card.description.props.children[0].props.children}
                </Card.Text>
                <Button variant="warning" onClick={() => handleShow(card.title, card.description)}>
                 <strong>View More</strong>
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      
      <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
        <Modal.Header >
          <Modal.Title className="custom-modal1">{currentTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal2">{currentDescription}</Modal.Body>
        <Modal.Footer className="custom-modal3">
          <Button variant="danger" onClick={handleClose}> Close </Button>
        </Modal.Footer>
      </Modal>

     <Footer/>
    </>
  );
};

export default Home;
