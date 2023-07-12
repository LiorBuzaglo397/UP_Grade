import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';

const StudentGrades = () => {
  const { courseId, semester_Year, semester_Num } = JSON.parse(localStorage.getItem('studentGradesParams'));
  const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));

  const CourseInfo = {
    courseId,
    semester_Year,
    semester_Num,
  };

  const [grades, setGrades] = useState([]);
  const { course } = useParams();
  const history = useHistory();
  const [filteredGrades, setFilteredGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('localhost:5000/api/grade/getGradesByCourseIDForStudent', {
          user_Id: studentInfo.user_Id,
          courseId: CourseInfo.courseId,
          semester_Year: CourseInfo.semester_Year,
          semester_Num: CourseInfo.semester_Num,
        });
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };
  
    fetchGrades();
  }, []);
  


  useEffect(() => {
    const filterGrades = () => {
      if (Array.isArray(grades)) {
        const filtered = grades.filter((grade) => grade.course === course);
        setFilteredGrades(filtered);
      }
    };
    

    filterGrades();
  }, [grades, course]);

  const handleStatsClick = (id, name) => {
    // Handle the click event for viewing statistics
    // You can implement the logic here
    console.log('View stats for grade:', id, name);
  };

  return (
    <div>

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
