import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ data, height = '270px', width = '100%' }) {
  const labels = data.labels;

  const colors = [
    'rgb(255, 99, 132)',
    'rgb(75, 192, 192)',
    'rgb(53, 162, 235)',
  ];

  const datasets = data.stats.map((stat, index) => {
    return {
      label: stat.label,
      data: stat.data,
      backgroundColor: colors[index],
      borderColor: colors[index],
    };
  });

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false,
        text: '',
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
      point: {
        hitRadius: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          color: 'rgb(249 249 249)',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: function (context) {
            if (context.tick.value >= 0) {
              return 'rgb(243 243 243)';
            } else if (context.tick.value < 0) {
              return 'rgb(243 243 243)';
            }

            return '#000000';
          },
        },
      },
    },

    interaction: {
      intersect: false,
      mode: 'index',
      axis: 'x',
    },
  };

  const formateddata = {
    labels,
    datasets,
  };

  return (
    <div style={{ height: height, width: width }}>
      <Line options={options} data={formateddata} />
    </div>
  );
}
