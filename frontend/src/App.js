import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Login from './components/Login';
import StudentGrades from './components/StudentGrades';
import TeacherCourseGrades from './components/TeacherCourseGrades';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Logo from './images/Logo.png';
import TeacherAddGradesWithFile from './components/TeacherAddGradesWithFile';
import TeacherAddNewGrades from './components/TeacherAddNewGrades';
import TeacherCoursesAssignment from './components/TeacherCoursesAssignment'
/**  bootstrap ***/
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
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
  const [userType, setUserType] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  const handleLogin = (inputs) => {
    // Perform login validation
    // Here, we simply check if the username and password are not empty
      setLoggedIn(true);

  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType('');
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const renderUserForm = () => {
    console.log(userInfo);
    if (userInfo.user_Description      === "Student") {
      return <StudentDashboard />;
    } else if (userInfo.user_Description      === "Teacher"    ) {
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
                  <img className='dashboard-img' src={Logo} alt="logo" />
                  <h1>Welcome to UP-GRADE Website</h1><br></br>
                  {renderUserForm()}

                </div>
                </div>
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Route>
          <Route path="/student-grades/:course_ID/:semester_Year/:semester_Num/:course_Name" >
            <StudentGrades />
          </Route>
          <Route path="/teacher-grades/:course">
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
        </Switch>
      </div>
    </Router>
  );
};

export default App;