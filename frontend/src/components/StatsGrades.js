import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const StatsGrades = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const assignmentId = searchParams.get('assignmentId');
  const assignment = searchParams.get('assignment');
  const numStudents = searchParams.get('numStudents');
  const averageGrade = searchParams.get('averageGrade');
  const medianGrade = searchParams.get('medianGrade');
  const standardDeviation = searchParams.get('standardDeviation');
  const highestGrade = searchParams.get('highestGrade');
  const lowestGrade = searchParams.get('lowestGrade');

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
        <br />
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StatsGrades;
