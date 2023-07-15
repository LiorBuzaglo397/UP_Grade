import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


const TeacherDashboard = () => {
  const teacherInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const history = useHistory(); // Access the history object
  const [newlyAddedRows, setNewlyAddedRows] = useState([]);


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

  const handleCourseSelection = (_id, course_Name) => {
    setSelectedCourse();
    const selectedCourse = courses.filter((course) => course._id === _id)[0];

    
    console.log(courses._id);
    localStorage.setItem('courseID', JSON.stringify(courses._id));
    localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));



    
  };

  return (
    <div>
      <Navbar/>
      <div className='dashboard-div'>
      <h2>Teacher Dashboard</h2>
      <h3>Your Courses:</h3>
      <ul >
      {courses.map((course) => (
        
      <Link
        to={`/teacher-grades/${course._id}/${course.course_Name}`}
        key={course._id}
        onClick={() => handleCourseSelection(course._id, course.course_Name)}
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

export default TeacherDashboard;
