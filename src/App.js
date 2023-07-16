import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';

/*****  bootstrap ******/
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>

/*
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js"></script>
*/ 

/****************   Login   **********************/ 
const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Perform login validation
    // Here, we simply check if the username and password are not empty
    if (username !== '' && password !== '') {
      setLoggedIn(true);
    } else {
      alert('Please enter a username and password.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserType('');
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const renderLoginForm = () => {
    return (
      <div>
        <img src='https://imgtr.ee/images/2023/06/01/S83jq.png'></img>
        <div className="login-container">
          <h1>Login to the system</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  };

  const renderUserForm = () => {
    if (userType === 'student') {
      return <StudentDashboard />;
    } else if (userType === 'lecturer') {
      return <LecturerDashboard />;
    }

    return null;
  };

  return (
    <div className='dashboard-div'>
      {loggedIn ? (          
        <div>
          <Navbar/>
            <img className='dashboard-img' src='https://imgtr.ee/images/2023/06/01/S83jq.png'></img>
            <h1>Welcome to UP-GRADE Website</h1><br></br>
            <button onClick={handleLogout}> Logout </button><br></br>
            <label>
              User Type: 
              <select value={userType} onChange={handleUserTypeChange}>
                <option value="">Select User Type</option>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
            </label>

            {renderUserForm()}
        </div>
      ) : (
        renderLoginForm()
      )}
    </div>
  );
};


// **************   Student Dashboard   ******************
const StudentDashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grades, setGrades] = useState({});

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    // Fetch grades for the selected course
    // Assuming grades are retrieved from an API
    const courseGrades = {
      // Sample grades data
      1: { grade: 'A' },
      2: { grade: 'B+' },
      3: { grade: 'A-' },
    };
    setGrades(courseGrades[course.id]);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Upload the file to the server
    // Assuming file upload functionality is handled by an API
    console.log('File uploaded:', file);
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <h3>Your Courses:</h3>
      <ul>
        {courses.map((course) => (
          <button key={course.id} onClick={() => handleCourseSelect(course)}>
            {course.name}
          </button>
        ))}
      </ul>

      {selectedCourse && (
        <div>
          <h4>Selected Course: {selectedCourse.name}</h4>
          <h4>Grades</h4>
          <p>Grade: {grades.grade}</p>
          <input type="file" onChange={handleFileUpload} />
        </div>
      )}
    </div>
  );
};

// **************   Lecturer Dashboard   ******************

const LecturerDashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [courseInfo, setCourseInfo] = useState('');

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    // Fetch students and course information for the selected course
    // Assuming data is retrieved from an API
    const courseStudents = {
      // Sample students data
      1: [
        { id: 1, name: 'Student 1' },
        { id: 2, name: 'Student 2' },
        { id: 3, name: 'Student 3' },
      ],
      2: [
        { id: 4, name: 'Student 4' },
        { id: 5, name: 'Student 5' },
      ],
      3: [
        { id: 6, name: 'Student 6' },
        { id: 7, name: 'Student 7' },
      ],
    };
    setStudents(courseStudents[course.id]);

    const courseData = {
      // Sample course information data
      1: { info: 'Mathematics course information' },
      2: { info: 'Physics course information' },
      3: { info: 'Chemistry course information' },
    };
    setCourseInfo(courseData[course.id].info);
  };

  const handleGradeUpdate = (studentId, newGrade) => {
    // Update grades for the selected student in the selected course
    // Assuming grade update functionality is handled by an API
    console.log(`Updated grade for student ${studentId}: ${newGrade}`);
  };

  const handleCourseEdit = () => {
    // Edit the course information for the selected course
    // Assuming course editing functionality is handled by an API
    console.log('Course edited');
  };

  return (
    <div>
      <h2>Lecturer Dashboard</h2>
      <h3>Courses</h3>
      <ul>
        {courses.map((course) => (
          <button key={course.id} onClick={() => handleCourseSelect(course)}>
            {course.name}
          </button>
        ))}
      </ul>

      {selectedCourse && (
        <div>
          <h4>Selected Course: {selectedCourse.name}</h4>
          <h4>Students</h4>
          <ul>
            {students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
          <h4>Course Information</h4>
          <p>{courseInfo}</p>
          <button onClick={handleCourseEdit}>Edit Course</button>

          <h4>Update Grades</h4>
          {students.map((student) => (
            <div key={student.id}>
              <label>
                Student: {student.name}
                <input
                  type="text"
                  onChange={(e) => handleGradeUpdate(student.id, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;