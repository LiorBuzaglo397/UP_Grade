import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Login from './components/Login';
import StudentGrades from './components/StudentGrades';
import { BrowserRouter as Router, Route, Switch, useHistory, Link } from 'react-router-dom';
import Logo from './images/Logo.png';
import TeacherAddGradesWithFile from './components/TeacherAddGradesWithFile';
import TeacherAddNewGrades from './components/TeacherAddNewGrades';
import TeacherCoursesAssignment from './components/TeacherCoursesAssignment';
import SignUp from './components/SignUp';
/**  bootstrap ***/
import 'bootstrap/dist/css/bootstrap.min.css';

import StatsGrades from './components/StatsGrades';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Perform login validation
    // Here, we simply check if the username and password are not empty
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleFormSubmit = () => {
    if (userInfo.user_Description === 'Student') {
      history.push(`/studentdashboard/${semester}/${year}`);
    } else if (userInfo.user_Description === 'Teacher') {
      history.push(`/teacherdashboard/${semester}/${year}`);
    }
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
                <div className="dashboard-div">
                  <br />
                  <img className="dashboard-img" src={Logo} alt="logo" />
                  <h1>Welcome to UP-GRADE Website</h1>
                  <br />
                  <br />
                  <label>
                    Select Semester:
                    <select value={semester} onChange={handleSemesterChange}>
                      <option value="">Select Semester</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </label>
                  <br />
                  <br />
                  <label>
                    Select Year:
                    <select value={year} onChange={handleYearChange}>
                      <option value="">Select Year</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </select>
                  </label>
                  <br />
                  <br />
                  <button onClick={handleFormSubmit} className="buttons">
                    Done
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Route>
          <Route path="/student-grades/:course_ID/:semester_Year/:semester_Num/:course_Name">
            <StudentGrades />
          </Route>
          <Route path="/teacher-grades/:course_ID/:semester_Year/:semester_Num/:course_Name">
            <TeacherCoursesAssignment />
          </Route>
          <Route path="/studentdashboard/:semester/:year">
            <StudentDashboard />
          </Route>
          <Route path="/teacherdashboard/:semester/:year">
            <TeacherDashboard />
          </Route>
          <Route path="/stats">
            <StatsGrades />
          </Route>
          <Route path="/TeacherAddNewGrades">
            <TeacherAddNewGrades />
          </Route>
          <Route path="/TeacherAddGradesWithFile">
            <TeacherAddGradesWithFile />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
