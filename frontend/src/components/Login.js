import React, { useState } from 'react';
import Logo from './images/Logo.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    user_Password: "",
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
      return null; // Return a default value or handle the error case as needed
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history.push("/StudentDashboard"));
  };
  

  return (
    <div className='login-div'>
      <div className='login-container'>
        <h1>Login to the system</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email" // Added name attribute
            value={inputs.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="user_Password" // Added name attribute
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
