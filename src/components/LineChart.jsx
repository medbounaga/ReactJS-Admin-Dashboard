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
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                fontColor: '#333',
                usePointStyle: true,
                pointStyle: 'circle',
            }
        },
        title: {
            display: false,
            text: '',
        },
    },
    elements: {
        line: {
            tension: 0.2
        }
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Sales',
            data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: 'Profit',
            data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
        },
        {
            label: 'Cogs',
            data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235)',

        },
    ],
};


export function LineChart({ height = '270px', width = '100%' }) {
    return (
        <div style={{ height: height, width: width }}>
            <Line options={options} data={data} />
        </div>
    )
}
