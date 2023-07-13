import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const TeacherDashboard = () => {
  const teacherInfo = JSON.parse(localStorage.getItem('teacherInfo'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const history = useHistory(); // Access the history object

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/user/getAllCourses', {
          params: {
            _id: teacherInfo._id,
          },
        });
        const coursesData = response.data.courses;
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [teacherInfo]);

  const handleCourseSelection = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleViewGrades = () => {
    if (selectedCourse) {
      const selectedCourseData = courses.find((course) => course._id === selectedCourse);
  
      const gradesParams = {
        user_ID: teacherInfo.user_ID, // Change 'studentInfo' to 'teacherInfo'
        course_ID: selectedCourseData.course_ID,
        semester_Year: selectedCourseData.semester_Year,
        semester_Num: selectedCourseData.semester_Num,
      };
  
      localStorage.setItem('studentGradesParams', JSON.stringify(gradesParams));
      localStorage.setItem('teacherInfo', JSON.stringify(teacherInfo)); // Store teacherInfo instead of studentInfo
  
      history.push('/TeacherCourseGrades');
    }
  };
  

  return (
    <div>
      <div className='dashboard-div'>
        <h2>Teacher Dashboard</h2>
        <h3>Your Courses:</h3>
        <select value={selectedCourse} onChange={handleCourseSelection}>
          <option value=''>Select a course</option>
          {courses.map((course) => (
            <option value={course._id} key={course._id}>
              {course.course_Name}
            </option>
          ))}
        </select>
        {selectedCourse && <button onClick={handleViewGrades}>View Grades</button>}
      </div>
    </div>
  );
};

export default TeacherDashboard;
