import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TemperatureBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = data.map(item => item.day);
    const temperatures = data.map(item => item.temp);

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff' // Y-axis labels color
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)' // Y-axis grid color
            }
          },
          x: {
            ticks: {
              color: '#fff' // X-axis labels color
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)' // X-axis grid color
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff' // Legend labels color
            }
          }
        }
      },
      plugins: [{
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      }]
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="temperature-chart" style={{background:'#E2DFD0'}}>
      <h3>Average Temperatures of Next 5 Days-</h3><br/>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TemperatureBarChart;
