import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


const StudentDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const history = useHistory(); // Access the history object
  const [newlyAddedRows, setNewlyAddedRows] = useState([]);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/user/getAllCourses', {
          params: {
            _id: userInfo._id,
          },
        });
        const coursesData = response.data.courses;
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [userInfo]);

  const handleCourseSelection = (course) => {
    localStorage.setItem('selectedCourse', JSON.stringify(course));
    console.log(course);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

  };
  

  return (
    <div>
      <Navbar/>
      <div className='dashboard-div'>
      <h2>Student Dashboard</h2>
      <h3>Your Courses:</h3>
      <ul >
      {courses.map((course) => (
  <Link
    to={`/student-grades/${course.course_ID}/${course.semester_Year}/${course.semester_Num}/${course.course_Name}`}
    key={course._id}
    onClick={() => handleCourseSelection(course)}
  >
    <button>
      {course.course_Name}
    </button>
  </Link>
))}
      </ul></div>
    </div>
  );
};

export default StudentDashboard;
