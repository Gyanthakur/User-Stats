// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// const ActivityGraph = ({ contributions }) => {
//   if (!contributions) return null;

//   const data = {
//     labels: contributions.weeks?.map((week) => week.week),
//     datasets: [
//       {
//         label: "Contributions",
//         data: contributions.weeks.map((week) => week.total),
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// export default ActivityGraph;


const ActivityGraph = ({ contributions }) => {
    if (!contributions || !contributions.weeks) {
      return <p>No contribution data available.</p>;
    }
  
    const data = {
      labels: contributions.weeks.map((week) => week.week),
      datasets: [
        {
          label: "Contributions",
          data: contributions.weeks.map((week) => week.total),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  
  export default ActivityGraph;
  