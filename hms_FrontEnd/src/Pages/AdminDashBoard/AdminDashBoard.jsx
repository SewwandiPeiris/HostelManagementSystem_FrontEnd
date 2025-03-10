import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    series: [
      { name: "PRODUCT A", data: [44, 55, 41, 67, 22, 43] },
      { name: "PRODUCT B", data: [13, 23, 20, 8, 13, 27] },
      { name: "PRODUCT C", data: [11, 17, 15, 15, 21, 14] },
      { name: "PRODUCT D", data: [21, 7, 25, 13, 22, 8] },
    ],
    categories: [
      "01/01/2011 GMT",
      "01/02/2011 GMT",
      "01/03/2011 GMT",
      "01/04/2011 GMT",
      "01/05/2011 GMT",
      "01/06/2011 GMT",
    ],
  });

  const options = {
    chart: { type: "bar", height: 350, stacked: true, toolbar: { show: true }, zoom: { enabled: true } },
    responsive: [
      { breakpoint: 480, options: { legend: { position: "bottom", offsetX: -10, offsetY: 0 } } },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: { total: { enabled: true, style: { fontSize: "13px", fontWeight: 900 } } },
      },
    },
    xaxis: { type: "datetime", categories: chartData.categories },
    legend: { position: "right", offsetY: 40 },
    fill: { opacity: 1 },
  };

  return (
    <Container>
      <h2 className="text-center mt-3">Dashboard Overview</h2>
      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow p-4">
            <h5>Sales Data</h5>
            <Chart options={options} series={chartData.series} type="bar" height={350} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
