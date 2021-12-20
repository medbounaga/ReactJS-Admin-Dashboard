import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
      text: '',
    },
    legend: {
      display: true,
      position: 'top',
      labels: {
          fontColor: '#333',
          usePointStyle: true,
          pointStyle: 'rectRounded',
      }
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Profit',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Cogs',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export function BarChart({height='270px', width='100%'}) {
  return(
  <div style={{height: height, width: width}}>
    <Bar options={options} data={data} />
  </div> 
  )
}
