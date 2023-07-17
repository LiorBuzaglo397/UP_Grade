import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const TeacherDashboard = ({ semester, year }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const history = useHistory();
  const [newlyAddedRows, setNewlyAddedRows] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
 // const semester = searchParams.get('semester');
 // const year = searchParams.get('year');
  console.log(semester);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://upgradebyliorandnofar-api.onrender.com/api/user/getAllCourses', {
          params: {
            _id: userInfo._id,
            semester_Year: year,
            semester_Num: semester,
          },
        });
        const coursesData = response.data.courses;
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [userInfo, semester, year]);

  const handleCourseSelection = (course) => {
    localStorage.setItem('selectedCourse', JSON.stringify(course));
    console.log(course);
  };

  return (
    <div>
      <Navbar />
      <div className='dashboard-div'>
        <h2>Teacher Dashboard</h2>
        <h3>Your Courses:</h3>
        <br/>
        <ul>
          {courses.length === 0 ? (
            <h3>No courses available</h3>
          ) : (
            courses.map((course) => (
              <Link
                to={`/teacher-grades/${course._id}/${course.semester_Year}/${course.semester_Num}/${course.course_Name}`}
                key={course._id}
                onClick={() => handleCourseSelection(course)}
              >
                <button>{course.course_Name}</button>
              </Link>
            ))
          )}
        </ul>
 
      </div>
    </div>
  );
};

export default TeacherDashboard;