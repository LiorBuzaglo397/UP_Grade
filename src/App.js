import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

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
      <div className='login-div'>
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
    } else if (userType === 'teacher') {
      return <TeacherDashboard />;
    }

    return null;
  };

  return (
    <div>
      {loggedIn ? (
        <div> 
           <Navbar handleLogout={handleLogout} />         
          <div className='dashboard-div'>
              <br></br>
              <img className='dashboard-img' src='https://imgtr.ee/images/2023/06/01/S83jq.png'></img>
              <h1>Welcome to UP-GRADE Website</h1><br></br>
              <button onClick={handleLogout}> Logout </button><br></br>
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
        renderLoginForm()
      )}
    </div>
  );
};

export default App;
