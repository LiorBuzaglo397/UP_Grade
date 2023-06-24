import React, { useState } from 'react';
import './index.css';
import Navbar from './Navbar';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import Login from './Login';
import StudentGrades from './StudentGrades';
import TeacherCourseGrades from './TeacherCourseGrades';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('localhost:5000/api/use/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setLoggedIn(true);
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while logging in.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType('');
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const renderUserForm = () => {
    if (userType === 'student') {
      return <StudentDashboard />;
    } else if (userType === 'teacher') {
      return <TeacherDashboard />;
    }

    return null;
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {loggedIn ? (
              <div>
                <Navbar handleLogout={handleLogout} />
                <div className='dashboard-div'>
                  <br></br>
                  <img className='dashboard-img' src='https://imgtr.ee/images/2023/06/01/S83jq.png' alt="logo" />
                  <h1>Welcome to UP-GRADE Website</h1><br></br>
                  <button onClick={handleLogout}>Logout</button><br></br>
                  <label>
                    User Type:
                    <select value={userType} onChange={handleUserTypeChange}>
                      <option value="">Select User Type</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </label>
                  {renderUserForm()}
                </div>
                </div>
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Route>
          <Route path="/student-grades/:course">
            <StudentGrades />
          </Route>
          <Route path="/teacher-grades/:course">
            <TeacherCourseGrades />
          </Route>
          <Route path="/student-dashboard">
            <StudentDashboard />
          </Route>
          <Route path="/teacher-dashboard">
            <TeacherDashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
