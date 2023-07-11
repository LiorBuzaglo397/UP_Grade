import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const StudentGrades = () => {
  const { user_Id, courseId, semester_Year, semester_Num } = useParams();
  const history = useHistory();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const studentGradesParams = JSON.parse(localStorage.getItem('studentGradesParams'));

        const response = await axios.get('http://localhost:5000/api/grade'); 
        const gradesData = response.data.grades;

        setGrades(gradesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGrades();
  }, [studentID, courseID]);

  return (
    <div>
      <Navbar />
      <div className='table-wrapper'>
        <br />
        <h2>Grades for Course {courseID}</h2>
        <table className='grade-table'>
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
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.name}</td>
                <td>{grade.date}</td>
                <td>{grade.type}</td>
                <td>{grade.grade}</td>
                <td>
                  <Button variant='primary'>View stats</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StudentGrades;
