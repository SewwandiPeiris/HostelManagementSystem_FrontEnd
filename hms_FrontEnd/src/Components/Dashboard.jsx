import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    axios
      .get("http://localhost:5000/api/dashboard") // Replace with your backend endpoint
      .then((response) => setDashboardData(response.data))
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        padding: "20px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card
        title="Total Summary"
        data={[
          { label: "Total Hostels", value: dashboardData.totalHostels },
          { label: "Total Rooms", value: dashboardData.totalRooms },
          { label: "Total Capacity", value: dashboardData.totalCapacity },
          { label: "Filled Capacity", value: dashboardData.filledCapacity },
          { label: "Available Capacity", value: dashboardData.availableCapacity },
        ]}
        chartData={{
          labels: ["Filled Capacity", "Available Capacity"],
          datasets: [
            {
              data: [
                dashboardData.filledCapacity,
                dashboardData.availableCapacity,
              ],
              backgroundColor: ["#36A2EB", "#FFCE56"],
            },
          ],
        }}
      />

      <Card
        title="Annual Hostel Payments"
        data={[
          { label: "Paid", value: dashboardData.paymentsPaid },
          { label: "Not Paid Yet", value: dashboardData.paymentsNotPaid },
        ]}
        chartData={{
          labels: ["Paid", "Not Paid Yet"],
          datasets: [
            {
              data: [
                dashboardData.paymentsPaid,
                dashboardData.paymentsNotPaid,
              ],
              backgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        }}
      />

      <Card
        title="Female Hostels Capacity"
        data={[
          { label: "Filled Capacity", value: dashboardData.femaleFilled },
          { label: "Available Capacity", value: dashboardData.femaleAvailable },
        ]}
        chartData={{
          labels: ["Filled Capacity", "Available Capacity"],
          datasets: [
            {
              data: [
                dashboardData.femaleFilled,
                dashboardData.femaleAvailable,
              ],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        }}
      />

      <Card
        title="Male Hostels Capacity"
        data={[
          { label: "Filled Capacity", value: dashboardData.maleFilled },
          { label: "Available Capacity", value: dashboardData.maleAvailable },
        ]}
        chartData={{
          labels: ["Filled Capacity", "Available Capacity"],
          datasets: [
            {
              data: [
                dashboardData.maleFilled,
                dashboardData.maleAvailable,
              ],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        }}
      />
    </div>
  );
};

export default Dashboard;
