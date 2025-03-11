import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../Components/SideBar";
import Tools from "../../Components/Tool";
import { getAllHostel, getAllEligibleStudent } from "../../Service/adminService";
import "./AdminDashBoard.css"; // Import the custom CSS

const AdminDashBoard = () => {
  const [hostels, setHostelList] = useState([]);
  const [students, setStudentList] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getAllHostel(token).then((res) => {
      setHostelList(res.data.content);
    });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getAllEligibleStudent(token).then((res) => {
      setStudentList(res.data.content);
    });
  }, []);

  // Extract lists dynamically
  const availableCapacityList = hostels.map((hostel) => hostel.available_capacity);
  const filledCapacityList = hostels.map((hostel) => hostel.filled_capacity);
  const totalCapacityList = hostels.map((hostel) => hostel.total_capacity);
  const hostelNameList = hostels.map((hostel) => hostel.hostel_name);

  // Compute total available and filled capacity
  const totalAvailableCapacity = availableCapacityList.reduce((acc, val) => acc + val, 0);
  const totalFilledCapacity = filledCapacityList.reduce((acc, val) => acc + val, 0);
  const totalHostels = hostels.length;
  const totalRooms = hostels.reduce((sum, hostel) => sum + hostel.total_rooms, 0);
  const totalCapacity = hostels.reduce((sum, hostel) => sum + hostel.total_capacity, 0);

  // Count male and female students
  const maleCount = students.filter((student) => student.gender === "Male").length;
  const femaleCount = students.filter((student) => student.gender === "Female").length;

  // Bar Chart Data
  const barChartData = {
    series: [
      { name: "Available Capacity", data: availableCapacityList },
      { name: "Filled Capacity", data: filledCapacityList },
      { name: "Total Capacity", data: totalCapacityList },
    ],
  };

  const barOptions = {
    chart: { type: "bar", height: 350, stacked: true, toolbar: { show: true }, zoom: { enabled: true } },
    colors: ["#07b4d1", "#f56133", "#843f58"], // Custom colors for bars
    xaxis: { categories: hostelNameList },
    legend: { position: "right", offsetY: 40 },
    fill: { opacity: 1 },
  };

  // Pie Chart Data (Available vs. Filled Capacity)
  const pieChartData = {
    series: [totalAvailableCapacity, totalFilledCapacity],
  };

  // const pieOptions = {
  //   labels: ["Total Available Capacity", "Total Filled Capacity"],
  //   colors: ["#00e69d", "#feac00"], // Green & Red
  //   chart: { type: "pie" },
  //   legend: { position: "bottom" },
  // };

  // Pie Chart Data for Gender Distribution
  const genderPieChartData = {
    series: [maleCount, femaleCount],
  };
  const pieOptions = {
    labels: ["Total Available Capacity", "Total Filled Capacity"],
    colors: ["#00e69d", "#feac00"], // Green & Orange
    chart: { type: "pie", width: "80%", height: 150 }, // Reduce width and height
    plotOptions: {
      pie: {
        size: 10, // Reduce pie chart size (default is 100)
      },
    },
    legend: { position: "bottom" },
  };
  
  // Pie Chart Data for Gender Distribution (Smaller Size)
  const genderPieOptions = {
    labels: ["Male Students", "Female Students"],
    colors: ["#0092fa", "#fe2c51"], // Blue & Pink
    chart: { type: "pie", width: "80%", height: 150 }, // Reduce width and height
    plotOptions: {
      pie: {
        size: 10, // Reduce pie chart size
      },
    },
    legend: { position: "bottom" },
  };
  

  // const genderPieOptions = {
  //   labels: ["Male Students", "Female Students"],
  //   colors: ["#0092fa", "#fe2c51"], // Blue & Pink
  //   chart: { type: "pie" },
  //   legend: { position: "bottom" },
  // };

  return (
    <> <Tools />
      <Sidebar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin DashBoard</h2>
        <Container>

          <Row className="r5">
            <Col className="c5">
              <Card className="dashboard-card detail-chart-card">
                <h5 className="header5">Hostel Overview</h5>
                <Row>
                  <Col><h6>Total Hostels:</h6> <strong>{totalHostels}</strong></Col>
                  <Col ><h6>Total Rooms:</h6> <strong>{totalRooms}</strong></Col>
                  <Col><h6>Total Capacity:</h6> <strong>{totalCapacity}</strong></Col>
                  <Col ><h6>Total Filled Capacity:</h6> <strong>{totalFilledCapacity}</strong></Col>
                  <Col><h6>Total Available Capacity:</h6> <strong>{totalAvailableCapacity}</strong></Col>
                </Row>
              </Card>
            </Col>
            </Row>
            <Row className="r5">
            {/* Bar Chart */}
            <Col className="c5">
              <Card className="dashboard-card bar-chart-card">
                <h5>Hostel Capacity Overview</h5>
                <Chart options={barOptions} series={barChartData.series} type="bar" height={350} />
              </Card>
            </Col>
         

          
            {/* Pie Chart (Total Available vs Filled Capacity) */}
            <Col className="c5">
              <Card className="dashboard-card pie-chart-card">
                <h5>Total Available vs. Filled Capacity</h5>
                <Chart options={pieOptions} series={pieChartData.series} type="pie" height={350} />
              </Card>
            </Col>

            {/* Pie Chart (Male vs Female Students) */}
            <Col className="c5">
              <Card className="dashboard-card pie-chart-card1">
                <h5>Student Gender Distribution</h5>
                <Chart options={genderPieOptions} series={genderPieChartData.series} type="pie" height={350} />
              </Card>
            </Col>


          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminDashBoard;
