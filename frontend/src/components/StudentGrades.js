import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const StudentGrades = () => {
  const { course_ID, semester_Year, semester_Num } = JSON.parse(localStorage.getItem('studentGradesParams'));
  const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));

  const CourseInfo = {
    course_ID,
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
        const response = await axios.get(`http://localhost:5001/api/grade/getGradesByCourseIDForStudent?user_ID=${studentInfo.user_ID}&course_ID=${CourseInfo.course_ID}&semester_Year=${CourseInfo.semester_Year}&semester_Num=${CourseInfo.semester_Num}`);
        console.log(response.data);
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [CourseInfo.course_ID, CourseInfo.semester_Num, CourseInfo.semester_Year, studentInfo.user_ID]);

  useEffect(() => {
    if (Array.isArray(grades)) {
      const filtered = grades.filter((grade) => grade.course_ID === course);
    
      setFilteredGrades(filtered);
    }
  }, [grades, course]);

  const handleStatsClick = (id, name) => {
    console.log('View stats for grade:', id, name);
  };

  return (
    <div>
      <div className='table-wrapper'>
        <br />
        <h2>Grades for {course}</h2>
        {filteredGrades.length > 0 ? (
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
              {filteredGrades.map((grade) => (
                <tr key={grade._id}>
                  <td>{grade.gradeType}</td>
                  <td>{grade.gradeUploadDate}</td>
                  <td>{grade.gradeType}</td>
                  <td>{grade.grade}</td>
                  <td>
                    <Button onClick={() => handleStatsClick(grade._id, grade.gradeType)} variant='primary'>
                      View stats
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No grades available for this course.</p>
        )}
        <br />
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StudentGrades;
