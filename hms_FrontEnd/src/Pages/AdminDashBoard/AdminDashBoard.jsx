import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  const [barChartData] = useState({
    series: [
      { name: "PRODUCT A", data: [44, 55, 41, 67, 22, 43] },
      { name: "PRODUCT B", data: [13, 23, 20, 8, 13, 27] },
      { name: "PRODUCT C", data: [11, 17, 15, 15, 21, 14] },
      { name: "PRODUCT D", data: [21, 7, 25, 13, 22, 8] },
    ],
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  });

  const [pieChartData] = useState({
    series: [44, 55, 41, 67],
    labels: ["PRODUCT A", "PRODUCT B", "PRODUCT C", "PRODUCT D"],
  });

  const barOptions = {
    chart: { type: "bar", height: 350, stacked: true, toolbar: { show: true }, zoom: { enabled: true } },
    responsive: [
      { breakpoint: 480, options: { legend: { position: "bottom", offsetX: -10, offsetY: 0 } } },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: { total: { enabled: true, style: { fontSize: "13px", fontWeight: 900 } } },
      },
    },
    xaxis: { categories: barChartData.categories },
    legend: { position: "right", offsetY: 40 },
    fill: { opacity: 1 },
  };

  const pieOptions = {
    labels: pieChartData.labels,
    chart: { type: "pie" },
    legend: { position: "bottom" },
    responsive: [{ breakpoint: 480, options: { chart: { width: 300 }, legend: { position: "bottom" } } }],
  };

  return (
    <Container>
      <h2 className="text-center mt-3">Dashboard Overview</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow p-4">
            <h5>Sales Data</h5>
            <Chart options={barOptions} series={barChartData.series} type="bar" height={350} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow p-4">
            <h5>Product Distribution</h5>
            <Chart options={pieOptions} series={pieChartData.series} type="pie" height={350} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
