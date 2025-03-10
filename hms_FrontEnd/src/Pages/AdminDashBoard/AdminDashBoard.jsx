import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Form, FormControl, FormLabel } from "react-bootstrap";

const AdminDashBoard = () => {
  const [stats, setStats] = useState({ totalHostels: 0, totalRooms: 0, totalCapacity: 0, totalFilledCapacity: 0, totalAvailableCapacity: 0 });
  const [barChartData, setBarChartData] = useState({ series: [], categories: [] });
  const [pieChartData, setPieChartData] = useState({ series: [], labels: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/hostel-capacity"); // Adjust API URL
      const data = response.data;

      const totalHostels = data.length;
      const totalRooms = data.reduce((acc, item) => acc + item.total_rooms, 0);
      const totalCapacity = data.reduce((acc, item) => acc + item.total_capacity, 0);
      const totalFilledCapacity = data.reduce((acc, item) => acc + item.filled_capacity, 0);
      const totalAvailableCapacity = data.reduce((acc, item) => acc + item.available_capacity, 0);

      setStats({ totalHostels, totalRooms, totalCapacity, totalFilledCapacity, totalAvailableCapacity });

      const filledCapacity = data.map((item) => item.filled_capacity);
      const availableCapacity = data.map((item) => item.available_capacity);
      const categories = data.map((item) => item.hostel_name);

      setBarChartData({
        series: [
          { name: "Filled Capacity", data: filledCapacity },
          { name: "Available Capacity", data: availableCapacity },
        ],
        categories,
      });

      setPieChartData({
        series: [totalFilledCapacity, totalAvailableCapacity],
        labels: ["Filled Capacity", "Available Capacity"],
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const barOptions = {
    chart: { type: "bar", height: 350, stacked: true, toolbar: { show: true } },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        dataLabels: { total: { enabled: true, style: { fontSize: "13px", fontWeight: 900 } } },
      },
    },
    xaxis: { type: "category", categories: barChartData.categories },
    legend: { position: "right", offsetY: 40 },
    fill: { opacity: 1 },
  };

  const pieOptions = {
    labels: pieChartData.labels,
    chart: { type: "pie" },
    legend: { position: "bottom" },
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 300 }, legend: { position: "bottom" } },
    }],
  };

  return (
    <div>
      <h3>Total Summary</h3>
      <Form>
        <div>
          <h4>Statistics</h4>
          <FormLabel>Total Hostels:</FormLabel>
          <FormControl type="text" value={stats.totalHostels} readOnly />
          <FormLabel>Total Rooms:</FormLabel>
          <FormControl type="text" value={stats.totalRooms} readOnly />
          <FormLabel>Total Capacity:</FormLabel>
          <FormControl type="text" value={stats.totalCapacity} readOnly />
          <FormLabel>Total Filled Capacity:</FormLabel>
          <FormControl type="text" value={stats.totalFilledCapacity} readOnly />
          <FormLabel>Total Available Capacity:</FormLabel>
          <FormControl type="text" value={stats.totalAvailableCapacity} readOnly />
        </div>
      </Form>
      <h3>Hostel Capacity Chart</h3>
      <Chart options={barOptions} series={barChartData.series} type="bar" height={350} />
      <h3>Hostel Capacity Pie Chart</h3>
      <Chart options={pieOptions} series={pieChartData.series} type="pie" height={350} />
    </div>
  );
};

export default AdminDashBoard;
