import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { FaRupeeSign } from 'react-icons/fa';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function ExpenseChart({ year }) {
  const expense = useSelector(state => state);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Initialize monthly amounts
  const monthlyData = months.reduce((acc, _, index) => {
    acc[index] = 0;
    return acc;
  }, []);

  let total = 0;

  // Process expenses
  expense.expenses.forEach((e) => {
    if (e.date.includes(year)) {
      total += Number(e.amount);
      const month = parseInt(e.date.split("-")[1], 10) - 1; // Convert to 0-based index
      if (month >= 0 && month < 12) {
        monthlyData[month] += Number(e.amount);
      }
    }
  });

  // Generate gradient for bars
  const generateGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(1, 'rgba(29, 78, 216, 0.8)');
    return gradient;
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Expense',
        data: monthlyData,
        backgroundColor: (context) => generateGradient(context.chart.ctx),
        borderColor: 'rgba(29, 78, 216, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(29, 78, 216, 0.9)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Monthly Expenses for ${year}`,
        font: {
          size: 16,
          weight: '600',
        },
        color: '#1e3a8a',
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: '#1e3a8a',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => {
            return ` ₹${context.raw.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
          },
          callback: (value) => `₹${value.toLocaleString('en-IN')}`
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad'
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-2xl font-bold text-blue-900 mb-2 sm:mb-0">
          Annual Expense Summary
        </h3>
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
          <FaRupeeSign className="text-blue-700 mr-1" />
          <span className="text-blue-900 font-semibold">
            Total: ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
      
      <div className="w-full h-[350px] sm:h-[400px]">
        <Bar 
          data={data} 
          options={options} 
          className="chart-container"
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>Hover over bars to see detailed amounts</p>
      </div>
    </div>
  );
}