import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PersonalResultPage = () => {
  const [ratingData, setRatingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockData = {
        overallRating: 4.5,
        detailedRatings: [
          { category: 'Quality', score: 4.7 },
          { category: 'Timeliness', score: 4.3 },
          { category: 'Satisfaction', score: 4.6 },
          { category: 'Speed', score: 4.0 },
          { category: 'Handsome', score: 5.0 },
        ],
      };
      setRatingData(mockData);
    }, 1000);
  }, []);

  const data = {
    labels: ratingData ? ratingData.detailedRatings.map((r) => r.category) : [],
    datasets: [
      {
        label: 'Scores',
        data: ratingData ? ratingData.detailedRatings.map((r) => r.score) : [],
        backgroundColor: 'rgba(33, 161, 241, 0.2)',
        borderColor: 'rgba(33, 161, 241, 1)',
        pointBackgroundColor: 'rgba(33, 161, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(33, 161, 241, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          circular: true,
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}`;
          },
        },
      },
    },
  };

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!ratingData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#282c34"
    >
      <Box
        width="600px"
        bgcolor="#1c1e22"
        color="#ffffff"
        borderRadius="10px"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
        overflow="hidden"
      >
        <Box padding="20px" bgcolor="#2c2f33" textAlign="center">
          <Typography variant="h4" color="#61dafb" gutterBottom>
            Rating Results
          </Typography>
          <Typography variant="h5" color="#21a1f1">
            Overall Rating: {ratingData.overallRating}
          </Typography>
        </Box>
        <Box padding="20px">
          <Typography variant="h6" color="#21a1f1" align="center" gutterBottom>
            Detailed Ratings
          </Typography>
          <Radar data={data} options={options} />
          <Box display="flex" justifyContent="space-around" marginTop="20px">
            <Button
              variant="contained"
              style={{ backgroundColor: '#61dafb', color: '#000' }}
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#61dafb', color: '#000' }}
              onClick={() => (window.location.href = '/new-task')}
            >
              Start New Task
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalResultPage;
