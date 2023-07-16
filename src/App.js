import React, { useState } from 'react';
import './index.css';
import Navbar from './Navbar';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import Login from './Login';
import StudentGrades from './StudentGrades';
import TeacherCourseGrades from './TeacherCourseGrades';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Logo from './images/Logo.png';
import StatsGrades from './StatsGrades';

/*****  bootstrap ******/
import 'bootstrap/dist/css/bootstrap.min.css';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>


const App = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  

  const handleLogin = (username, password) => {
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
    setUserType('');
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const renderUserForm = () => {
    if (userType === 'student') {
      window.location.href= "/student-dashboard";
    } else if (userType === 'teacher') {
      window.location.href= "/teacher-dashboard";
    }
    return null;
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };
  
  const handleYearChange = (event) => {
    setYear(event.target.value);
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
                  <img className='dashboard-img' src={Logo} alt="logo" />
                  <h1>Welcome to UP-GRADE Website</h1><br></br>
                  <br/>
                  <label>
                  Select Semester: 
                  <select value={semester} onChange={handleSemesterChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </label>
                <br/><br/>
                <label>
                Select Year: 
                  <select value={year} onChange={handleYearChange}>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </label>
                <br/>
                <br/>
                <button onClick={renderUserForm} className='buttons'> Done </button>
                <br/>
                <br/>
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
          <Route exact path="/student-dashboard">
            <StudentDashboard />
          </Route>
          <Route exact path="/teacher-dashboard">
            <TeacherDashboard />
          </Route>
          <Route path="/stats">
            <StatsGrades />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
