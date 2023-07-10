import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentGrades from './StudentGrades';
import Navbar from './Navbar';
import axios from 'axios';

const StudentDashboard = () => {
  const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/getAllCourses', {
          params: {
            user_ID: studentInfo.user_ID,
          },
        });
        const coursesData = response.data.courses;
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCourses();
  }, []);

  const handleCourseSelection = (event) => {
    setSelectedCourse(event.target.value);

  };

  return (
    <div>
      <div className='dashboard-div'>
        <h2>Student Dashboard</h2>
        <h3>Your Courses:</h3>
        <select value={selectedCourse} onChange={handleCourseSelection}>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option value={course.course_Name} key={course.course_ID}>
              {course.course_Name}
            </option>
          ))}
        </select>
        {selectedCourse && (
          <Link to={`/student-grades/${selectedCourse}`}>
            <button>View Grades</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
