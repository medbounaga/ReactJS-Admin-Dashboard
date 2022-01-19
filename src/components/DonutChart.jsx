import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DonutChart({ data, labels, ...props }) {
  const options = {
    cutout: '65%',
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: '',
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        usePointStyle: true,
        titleFontSize: 6,
        callbacks: {
          labelPointStyle: function (context) {
            return {
              pointStyle: 'circle',
              rotation: 0,
            };
          },
        },
      },
    },
    responsive: true,
  };

  const theData = {
    labels,
    datasets: [
      {
        label: 'Title',
        data,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div {...props}>
      <Doughnut data={theData} options={options} />
    </div>
  );
}
