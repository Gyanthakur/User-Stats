// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// // Register the components for Chart.js
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Commits = ({ commitsData }) => {
//   const chartData = {
//     labels: commitsData?.map((data) => data.repoName),
//     datasets: [
//       {
//         label: "Commits per Repository",
//         data: commitsData?.map((data) => data.commitCount),
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Commits Graph</h2>
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <Line data={chartData} options={{ responsive: true }} />
//       </div>
//     </div>
//   );
// };

// export default Commits;


import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Commits = ({ commitsData }) => {
  const chartData = {
    labels: commitsData?.map((data) => data.repoName),
    datasets: [
      {
        label: "Commits per Repository",
        data: commitsData?.map((data) => data.commitCount),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">Commits Graph</h2>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <div className="relative w-full h-64 md:h-96">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Allow chart to adjust based on parent size
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    boxWidth: 20,
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Commits;
