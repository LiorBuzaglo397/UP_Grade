import React, { useState } from 'react';
import Logo from './images/Logo.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store'; // Update the import path in Login.js

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: '',
    user_Password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        email: inputs.email,
        user_Password: inputs.user_Password,
      });

      const data = res?.data || null;
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login' + error.message); // Throw an error to handle in handleSubmit
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.user_Password) {
      window.alert('Please fill in all fields');
    } else {
      sendRequest()
      .then((data) => {
        localStorage.setItem('studentInfo', JSON.stringify(data.user));
        dispatch(login()); // Dispatch the login action

        history.push('/StudentDashboard');

        // Check if the user is a student
        /*
        if ( data.user.user_Description === "Student") {
          localStorage.setItem('studentInfo', JSON.stringify(data.user));
          dispatch(login()); // Dispatch the login action

          history.push('/StudentDashboard');
        } else if ( data.user.user_Description === "Teacher") {
          // Handle other user types or invalid responses
          localStorage.setItem('teacherInfo', JSON.stringify(data.user));
          dispatch(login()); // Dispatch the login action
          history.push('/TeacherDashboard');
        }
        else{
          window.alert('The password of email are incorrect');
        }*/
      })
      .catch((error) => window.alert(error.message));
  }
  };

  return (
    
    <div className="login-div">
      <div className="login-container">
        <h1>Login to the system</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="user_Password"
            value={inputs.user_Password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
