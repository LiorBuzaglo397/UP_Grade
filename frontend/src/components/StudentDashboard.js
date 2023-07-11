import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const history = useHistory(); // Access the history object

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

  const handleViewGrades = () => {
    if (selectedCourse) {
      const selectedCourseData = courses.find(course => course.course_ID === selectedCourse);
  
      localStorage.setItem('studentGradesParams', JSON.stringify({
        user_Id: studentInfo.user_ID,
        courseId: selectedCourse,
        semester_Year: selectedCourseData.semester_Year,
        semester_Num: selectedCourseData.semester_Num,
      }));
  
      history.push('/StudentGrades');
    }
  };

  return (
    <div>
      <div className='dashboard-div'>
        <h2>Student Dashboard</h2>
        <h3>Your Courses:</h3>
        <select value={selectedCourse} onChange={handleCourseSelection}>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option value={course.course_ID} key={course.course_ID}>
              {course.course_Name}
            </option>
          ))}
        </select>
        {selectedCourse && (
          <button onClick={handleViewGrades}>View Grades</button>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
