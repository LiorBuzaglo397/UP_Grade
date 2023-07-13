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
        const response = await axios.get('http://localhost:5001/api/user/getAllCourses', {
          params: {
            _id: studentInfo._id,
          },
        });
        const coursesData = response.data.courses;
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch courses: ' + error.message);
      }
    };

    fetchCourses().catch((error) => console.error(error));
  }, [studentInfo]);

  const handleCourseSelection = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleViewGrades = () => {
  if (selectedCourse) {
    const selectedCourseData = courses.find((course) => course._id === selectedCourse);
    console.log(studentInfo.user_Id);

    const gradesParams = {
      user_ID: studentInfo.user_ID,
      course_ID: selectedCourseData.course_ID,
      semester_Year: selectedCourseData.semester_Year,
      semester_Num: selectedCourseData.semester_Num,
    };

    localStorage.setItem('studentGradesParams', JSON.stringify(gradesParams));
    localStorage.setItem('studentInfo', JSON.stringify(studentInfo));

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
            <option value={course._id} key={course._id}>
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
