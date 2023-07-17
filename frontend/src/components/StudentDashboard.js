import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const history = useHistory();
  const [newlyAddedRows, setNewlyAddedRows] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const semester = searchParams.get('semester');
  const year = searchParams.get('year');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://upgradebyliorandnofar-api.onrender.com/user/getAllCourses', {
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
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  return (
    <div>
      <Navbar />
      <div className='dashboard-div'>
        <h2>Student Dashboard</h2>
        <h3>Your Courses:</h3>
        <br/>
        <ul>
          {courses.length === 0 ? (
            <h3>No courses available</h3>
          ) : (
            courses.map((course) => (
              <Link
                to={`/student-grades/${course._id}/${course.semester_Year}/${course.semester_Num}/${course.course_Name}`}
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

export default StudentDashboard;
