import React, { useState } from 'react';
import Logo from './images/Logo.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store';
import {Link} from 'react-router-dom';


const Login = ({ handleLogin }) => {

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
      const res = await axios.post('http://localhost:5001/api/user/login', {
        email: inputs.email,
        user_Password: inputs.user_Password,
      });

      const data = res?.data || null;
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.user_Password) {
      window.alert('Please fill in all fields');
    } else {
      sendRequest()
        .then((data) => {
          localStorage.removeItem('studentInfo');
          if (data.user.user_Description === 'Student' || data.user.user_Description === 'Teacher') {
            localStorage.setItem('userInfo', JSON.stringify(data.user));
            dispatch(login());
            //if(data.user.user_Description === 'Student')
             //   history.push('/StudentDashboard');
           // else
             //   history.push('/TeacherDashboard');

          }
           else {
            window.alert('The password or email is incorrect');
            }

         handleLogin(inputs );


        })
        .catch((error) => window.alert(error.message));
    }
  };

  return (
    <div className='login-div'>
      <img src={Logo} alt="logo" />
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
                        <br/><br/>
          <label className='label-link'>Do you want to Sign Up? 
           <Link to="/signup"> Click here</Link>
          </label>
          </form>
        </div>
      </div>
  );
};

export default Login;
