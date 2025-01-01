import React from "react";
import { Bar } from "react-chartjs-2";

const Contributions = ({ contributionsGraph }) => {
  if (!contributionsGraph) return <p>Loading...</p>;

  const data = {
    labels: contributionsGraph.map((item) => item.date),
    datasets: [
      {
        label: "Contributions",
        data: contributionsGraph.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Contributions Over Time",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h3 className="text-xl font-bold">Contributions Graph</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Contributions;
