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


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({ data, height = '270px', width = '100%' }) {
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
      maxBarThickness: 10,
      categoryPercentage: 0.6,
      hoverBorderColor: 'rgb(251 251 251)',
      hoverBorderWidth: 1,
    };
  });

  const options = {
 
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
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: false,
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          color: 'rgb(249 249 249)',
        },
      },
      y: {
        stacked: false,
        grid: {
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

  const formatedData = {
    labels,
    datasets,
  };

  return (
    <div style={{ height: height, width: width }}>
      <Bar data={formatedData} options={options} />
    </div>
  );
}
