import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const StatsGrades = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract the URL parameters
  const assignmentId = searchParams.get('assignmentId');
  const assignment = searchParams.get('assignment');
  const numStudents = searchParams.get('numStudents');
  const averageGrade = searchParams.get('averageGrade');
  const medianGrade = searchParams.get('medianGrade');
  const standardDeviation = searchParams.get('standardDeviation');
  const highestGrade = searchParams.get('highestGrade');
  const lowestGrade = searchParams.get('lowestGrade');

  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: ['0-54', '55-64', '65-69', '70-74', '75-84', '85-89', '90-100'],
      datasets: [
        {
          label: 'Grade Distribution',
          data: [10, 15, 20, 25, 30, 35, 40], // Example data, replace with your own percentages
          backgroundColor: 'rgba(56, 31, 99, 0.8)',
          borderColor: 'rgba(201, 83, 205, 1)',
          borderWidth: 1,
          fontSize: 28,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: '%',
            color: 'black', 
          },
          ticks: {
            color: 'black', 
            fontSize: 28,
          },
        },
        x: {
          title: {
            display: true,
            text: 'Grade Range',
            color: 'black', 
          },
          ticks: {
            color: 'black', 
          },
          font: {
            size: 14, 
          },
        },
      },
    };

    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className='dashboard-div'>
        <h1 className='title'>Statistics for Assignment: {assignment}</h1>
        <div className='stats-div'>
          <br />
          <p>Number of Students: {numStudents}</p>
          <p>Average Grade: {averageGrade}</p>
          <p>Median Grade: {medianGrade}</p>
          <p>Standard Deviation: {standardDeviation}</p>
          <p>Highest Grade: {highestGrade}</p>
          <p>Lowest Grade: {lowestGrade}</p>
          <br />
        </div>
        <div className='chart-container'>
          <canvas ref={chartRef}></canvas>
        </div>
        <br />
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StatsGrades;
