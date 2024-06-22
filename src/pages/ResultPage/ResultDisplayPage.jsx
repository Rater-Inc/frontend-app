import React, { useEffect, useState } from 'react';
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
import './ResultDisplayPage.css';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultDisplayPage = () => {
  const [ratingData, setRatingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data by setting a timeout
    setTimeout(() => {
      const mockData = {
        overallRating: 4.5,
        detailedRatings: [
          { category: "Quality", score: 4.7 },
          { category: "Timeliness", score: 4.3 },
          { category: "Satisfaction", score: 4.6 }
        ]
      };
      setRatingData(mockData);
    }, 1000); // Simulate network delay
  }, []);

  const data = {
    labels: ratingData ? ratingData.detailedRatings.map(r => r.category) : [],
    datasets: [
      {
        label: 'Scores',
        data: ratingData ? ratingData.detailedRatings.map(r => r.score) : [],
        backgroundColor: 'rgba(33, 161, 241, 0.6)',
        borderColor: 'rgba(33, 161, 241, 1)',
        borderWidth: 1,
        barPercentage: 0.5, // Adjust the width of the bars
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          borderDash: [5, 5],
          lineWidth: 1,
        }
      }
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!ratingData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="result-display-page-container">
      <div className="result-display-page">
        <div className="header-section">
          <h1>Rating Results</h1>
          <div className="overall-rating">
            <h2>Overall Rating: {ratingData.overallRating}</h2>
          </div>
        </div>
        <div className="content-section">
          <h3>Detailed Ratings</h3>
          <Bar data={data} options={options} />
          <div className="user-interaction">
            <button onClick={() => window.history.back()}>Go Back</button>
            <button onClick={() => window.location.href = '/new-task'}>Start New Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplayPage;
