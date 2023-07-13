import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Navbar from './Navbar';

const StatsGrades = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract the URL parameters
  const assignmentId = searchParams.get('assignmentId');

  const [grades, setGrades] = useState([]);
  const [chartData, setChartData] = useState({});

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/grade/getGradesByAssignmentId?assignmentId=${assignmentId}`);
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [assignmentId]);

  useEffect(() => {
    if (Array.isArray(grades) && grades.length > 0) {
      // Calculate statistics based on grades
      const numStudents = grades.length;
      const gradeValues = grades.map((grade) => grade.grade);
      const averageGrade = calculateAverage(gradeValues);
      const medianGrade = calculateMedian(gradeValues);
      const standardDeviation = calculateStandardDeviation(gradeValues);
      const highestGrade = Math.max(...gradeValues);
      const lowestGrade = Math.min(...gradeValues);

      // Prepare chart data
      const gradeDistribution = calculateGradeDistribution(gradeValues);
      const chartData = {
        labels: Object.keys(gradeDistribution),
        datasets: [
          {
            label: 'Grade Distribution',
            data: Object.values(gradeDistribution),
            backgroundColor: 'rgba(56, 31, 99, 0.8)',
            borderColor: 'rgba(201, 83, 205, 1)',
            borderWidth: 1,
            fontSize: 28,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [grades]);

  useEffect(() => {
    if (chartData) {
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
    }
  }, [chartData]);

  const calculateAverage = (values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const calculateMedian = (values) => {
    const sorted = values.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  const calculateStandardDeviation = (values) => {
    const mean = calculateAverage(values);
    const squaredDifferences = values.map((val) => Math.pow(val - mean, 2));
    const variance = calculateAverage(squaredDifferences);
    return Math.sqrt(variance);
  };

  const calculateGradeDistribution = (values) => {
    const distribution = {
      '0-54': 0,
      '55-64': 0,
      '65-69': 0,
      '70-74': 0,
      '75-84': 0,
      '85-89': 0,
      '90-100': 0,
    };

    values.forEach((val) => {
      if (val >= 0 && val <= 54) {
        distribution['0-54']++;
      } else if (val >= 55 && val <= 64) {
        distribution['55-64']++;
      } else if (val >= 65 && val <= 69) {
        distribution['65-69']++;
      } else if (val >= 70 && val <= 74) {
        distribution['70-74']++;
      } else if (val >= 75 && val <= 84) {
        distribution['75-84']++;
      } else if (val >= 85 && val <= 89) {
        distribution['85-89']++;
      } else if (val >= 90 && val <= 100) {
        distribution['90-100']++;
      }
    });

    return distribution;
  };

  return (
    <div>
      <Navbar />
      <div className='dashboard-div'>
        <h1 className='title'>Statistics for Assignment: {assignmentId}</h1>
        <div className='stats-div'>
          <br />
          {grades.length > 0 ? (
            <>
              <p>Number of Students: {grades.length}</p>
              <p>Average Grade: {averageGrade}</p>
              <p>Median Grade: {medianGrade}</p>
              <p>Standard Deviation: {standardDeviation}</p>
              <p>Highest Grade: {highestGrade}</p>
              <p>Lowest Grade: {lowestGrade}</p>
            </>
          ) : (
            <p>No grades available for this assignment.</p>
          )}
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
