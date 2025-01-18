import React from "react";
import { Doughnut } from "react-chartjs-2";

const Card = ({ title, data, chartData }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        minHeight: "300px",
      }}
    >
      <h3>{title}</h3>
      <div style={{ marginTop: "10px" }}>
        {data.map((item, index) => (
          <p key={index}>
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
      </div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default Card;
