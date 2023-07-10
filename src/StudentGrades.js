import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const StudentGrades = () => {
  const { course } = useParams();
  const history = useHistory();

  const grades = [
    { id: 1, course: 'Mathematics', name: 'Mathematics Test 1', date: '2023-05-30', type: 'Test', grade: '95' },
    { id: 2, course: 'Mathematics', name: 'Ex1 Math', date: '2023-06-02', type: 'Exercise', grade: '85' },
    { id: 3, course: 'Mathematics', name: 'Lab1 Math', date: '2023-06-05', type: 'Lab', grade: '90' },
    { id: 4, course: 'Mathematics', name: 'Lab2 Math', date: '2023-08-05', type: 'Lab', grade: '-' },
  ];

  const filteredGrades = grades.filter((grade) => grade.course === course);

  // Function to handle stats button click
  const handleStatsClick = (assignmentId,assignmentName) => {
    // Logic to calculate statistics and navigate to the stats grades page
    const assignmentGrades = filteredGrades.filter((grade) => grade.id === assignmentId);
    const gradesList = assignmentGrades.map((grade) => parseFloat(grade.grade));
    const numStudents = gradesList.length;
    const averageGrade = gradesList.reduce((a, b) => a + b, 0) / numStudents;
    const sortedGrades = gradesList.sort((a, b) => a - b);
    const medianGrade = numStudents % 2 === 0 ? (sortedGrades[numStudents / 2 - 1] + sortedGrades[numStudents / 2]) / 2 : sortedGrades[Math.floor(numStudents / 2)];
    const standardDeviation = calculateStandardDeviation(gradesList);
    const highestGrade = Math.max(...gradesList);
    const lowestGrade = Math.min(...gradesList);

    // Navigate to the stats page with the calculated statistics
    history.push(`/stats?assignmentId=${encodeURIComponent(assignmentId)}&assignment=${encodeURIComponent(assignmentName)}&numStudents=${numStudents}&averageGrade=${averageGrade}&medianGrade=${medianGrade}&standardDeviation=${standardDeviation}&highestGrade=${highestGrade}&lowestGrade=${lowestGrade}`);
  };

  // Function to calculate standard deviation
  const calculateStandardDeviation = (gradesList) => {
    const mean = gradesList.reduce((a, b) => a + b, 0) / gradesList.length;
    const squaredDifferences = gradesList.map((grade) => (grade - mean) ** 2);
    const variance = squaredDifferences.reduce((a, b) => a + b, 0) / squaredDifferences.length;
    return Math.sqrt(variance);
  };

  return (
    <div>
      <Navbar />
      <div className='table-wrapper'>
        <br></br>
        <h2>Grades for {course}</h2>
        {filteredGrades.map((grade) => (
          <table key={grade.id} className='grade-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Submission</th>
                <th>Type</th>
                <th>Grade</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{grade.name}</td>
                <td>{grade.date}</td>
                <td>{grade.type}</td>
                <td>{grade.grade}</td>
                <td>
                  <Button onClick={() => handleStatsClick(grade.id,grade.name)} variant='primary'>
                    View stats
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
        <br></br>
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StudentGrades;


/************************************************
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

//const StudentGrades = ({ course }) => {
const StudentGrades = () => {
  
  const { course } = useParams();
  const history = useHistory();


  const grades = [
    { id: 1, course: 'Mathematics', name: 'Mathematics Test 1', date: '2023-05-30', type: 'Test', grade: '95' },
    { id: 2, course: 'Mathematics', name: 'Ex1 Math', date: '2023-06-02', type: 'Exercise', grade: '85' },
    { id: 3, course: 'Mathematics', name: 'Lab1 Math', date: '2023-06-05', type: 'Lab', grade: '90' },
    { id: 4, course: 'Mathematics', name: 'Lab2 Math', date: '2023-08-05', type: 'Lab', grade: '-' },
  ];

  const filteredGrades = grades.filter((grade) => grade.course === course);

  return (
    <div> 
      <Navbar />    
      <div className='table-wrapper'>
        <br></br> 
        <h2>Grades for { course }</h2>
        {filteredGrades.map((grade) => (
          <table key={grade.id} className='grade-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Submission</th>
                <th>Type</th>
                <th>Grade</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{grade.name}</td>
                <td>{grade.date}</td>
                <td>{grade.type}</td>
                <td>{grade.grade}</td>
              </tr>
            </tbody>
          </table>
        ))}
        <br></br>
        <button onClick={() => history.goBack()} className='back-button'>Go Back</button>
      </div>
    </div>
  );
};

export default StudentGrades;
************************************************/


/* last version
import React from 'react';

const StudentGrades = ({ course }) => {
  const grades = [
    { id: 1, course: 'Mathematics', name: 'Mathematics Test 1', date: '2023-05-30', type: 'Test', grade: '95' },
    { id: 2, course: 'Mathematics', name: 'Ex1 Math', date: '2023-06-02', type: 'Exercise', grade: '85' },
    { id: 3, course: 'Mathematics', name: 'Lab1 Math', date: '2023-06-05', type: 'Lab', grade: '90' },
    { id: 4, course: 'Mathematics', name: 'Lab2 Math', date: '2023-08-05', type: 'Lab', grade: '-' },
  ];

  const filteredGrades = grades.filter((grade) => grade.course === course.name);

  return (
    <div className='table-wrapper'>
      <h2>Grades for {course.name}</h2>
      {filteredGrades.map((grade) => (
        <table key={grade.id} className='grade-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Submission</th>
              <th>Type</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{grade.name}</td>
              <td>{grade.date}</td>
              <td>{grade.type}</td>
              <td>{grade.grade}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default StudentGrades;

*/

/*
import React from 'react';

const GradesPage = ({ course }) => {
  const grades = [
    { id: 1, course: 'Mathematics', date: '2023-05-30', type: 'Test', grade: 'A' },
    { id: 2, course: 'Mathematics', date: '2023-06-02', type: 'Exercise', grade: 'B+' },
    { id: 3, course: 'Mathematics', date: '2023-06-05', type: 'Lab', grade: 'A-' },
  ];

  const filteredGrades = grades.filter((grade) => grade.course === course.name);

  return (
    <div>
      <h2>Grades for {course.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Date of Submission</th>
            <th>Type</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.course}</td>
              <td>{grade.date}</td>
              <td>{grade.type}</td>
              <td>{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesPage;
*/