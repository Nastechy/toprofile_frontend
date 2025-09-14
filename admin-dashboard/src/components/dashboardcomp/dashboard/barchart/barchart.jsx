// BarChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';


const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Last 6 month',
        data: [27, 32, 15, 17, 20, 15, 12, 17, 19, 20, 40, 20], // Sample data, you can replace with your own
        fill: false,
        borderColor: '#EB6C1F', // Line color
        tension: 0.6, // Adjust the tension for a curved slope
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 10, // Interval on y-axis
            max: 60, // Maximum value on y-axis
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default BarChart;
