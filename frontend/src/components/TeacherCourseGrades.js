// TeacherCourseGrades component
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import TeacherAddNewGrades from './TeacherAddNewGrades';

const TeacherCourseGrades = () => {
  const { course_ID, semester_Year, semester_Num } = JSON.parse(localStorage.getItem('studentGradesParams'));
  const teacherInfo = JSON.parse(localStorage.getItem('teacherInfo'));

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
        const response = await axios.get(`http://localhost:5001/api/grade/getGradesByCourseIDForTeacher?course_ID=${CourseInfo.course_ID}&semester_Year=${CourseInfo.semester_Year}&semester_Num=${CourseInfo.semester_Num}`);
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [CourseInfo.course_ID, CourseInfo.semester_Num, CourseInfo.semester_Year, teacherInfo.user_ID]);

  useEffect(() => {
    if (Array.isArray(grades)) {
      const filtered = grades.filter((grade) => grade.course_ID === course);
      setFilteredGrades(filtered);
    }
  }, [grades, course]);

  const handleSignupClick = () => {
    console.log(filteredGrades);
    localStorage.setItem('grades', JSON.stringify(filteredGrades));
    history.push('/TeacherAddNewGrades');
  };

  return (
    <div>
      <div className='table-wrapper'>
        <h2>Teacher {course} Course Assignments</h2>
        {grades.length > 0 ? (
          <table className='grade-table'>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Assignment</th>
                <th>Date</th>
                <th>Type</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade._id}>
                  <td>{grade.user_ID}</td>
                  <td>{grade.gradeType + '' + grade.gradeTypeNum}</td>
                  <td>{grade.gradeUploadDate}</td>
                  <td>{grade.gradeType}</td>
                  <td>{grade.grade}</td>
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
        <button className='header-button' onClick={handleSignupClick}>
          Add new Assignments
        </button>
      </div>
      {/* Render the TeacherAddNewGrades component and pass the required props */}
      {filteredGrades.length > 0 && (
        <TeacherAddNewGrades grades={filteredGrades} courseInfo={CourseInfo} />
      )}
    </div>
  );
};

export default TeacherCourseGrades;
