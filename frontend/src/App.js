import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Login from './components/Login';
import StudentGrades from './components/StudentGrades';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Logo from './images/Logo.png';
import TeacherAddGradesWithFile from './components/TeacherAddGradesWithFile';
import TeacherAddNewGrades from './components/TeacherAddNewGrades';
import TeacherCoursesAssignment from './components/TeacherCoursesAssignment';
import SignUp from './components/SignUp';
/**  bootstrap ***/
import 'bootstrap/dist/css/bootstrap.min.css';

import StatsGrades from './components/StatsGrades';
//TeacherAddGradesWithFile
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');


  const handleLogin = (inputs) => {
    // Perform login validation
    // Here, we simply check if the username and password are not empty
      setLoggedIn(true);

  };

  const handleLogout = () => {
    setLoggedIn(false);
  };



  const renderUserForm = () => {
    if (userInfo.user_Description === "Student") {
      window.location.href = `/student-dashboard?semester=${semester}&year=${year}`;
    } else if (userInfo.user_Description === "Teacher") {
      window.location.href = `/teacher-dashboard?semester=${semester}&year=${year}`;
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
                  <option value="">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                </label>
                <br/><br/>
                <label>
                Select Year: 
                  <select value={year} onChange={handleYearChange}>
                  <option value="">Select Year</option>
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
          <Route path="/student-grades/:course_ID/:semester_Year/:semester_Num/:course_Name" >
            <StudentGrades />
          </Route>
          <Route path="/teacher-grades/:course_ID/:semester_Year/:semester_Num/:course_Name">
            <TeacherCoursesAssignment />
          </Route>
          <Route path="/student-dashboard">
            <StudentDashboard />
          </Route>
          <Route path="/teacher-dashboard">
            <TeacherDashboard />
          </Route>
          <Route path="/stats">
            <StatsGrades />
          </Route>
          <Route path="/TeacherAddNewGrades">
            <TeacherAddNewGrades/>
          </Route>
          <Route path="/TeacherAddGradesWithFile">
            <TeacherAddGradesWithFile/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;