import React, { useState } from 'react';
import Logo from './images/Logo.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    user_ID: '',
    first_Name: '',
    last_Name: '',
    email: '',
    user_Description: '',
    user_Password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email.match(emailRegex)) {
      window.alert('Please enter a valid email address');
      return;
    }
  
    // Password length validation
    if (inputs.user_Password.length < 8) {
      window.alert('Password should be at least 8 characters long');
      return;
    }
  
    if (
      !inputs.user_ID ||
      !inputs.first_Name ||
      !inputs.last_Name ||
      !inputs.email ||
      !inputs.user_Description ||
      !inputs.user_Password
    ) {
      window.alert('Please fill in all fields');
    } else {
      // Set user_Approved to "No" and user_Description based on the value
      const signupData = {
        ...inputs,
        user_Approved: 'No',
        user_Description: inputs.user_Description === 'Teacher' ? 'Teacher' : 'Student',
      };
  
      sendRequest(signupData)
        .then(() => {
          window.alert('Signup successful!');
          history.push('/Login');
        })
        .catch((error) => window.alert('Failed to signup: ' + error.message));
    }
  };
  

  const sendRequest = async (signupData) => {
    try {
      const response = await axios.post('https://upgradebyliorandnofar-api.onrender.com/api/user/signup', signupData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to signup: ' + error.message);
    }
  };

  return (

      
    <div className='login-div'>
    <img src={Logo} alt="logo" />
    <div className="login-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User ID" name="user_ID" value={inputs.user_ID} onChange={handleChange} />
          <input type="text" placeholder="First Name" name="first_Name" value={inputs.first_Name} onChange={handleChange} />
          <input type="text" placeholder="Last Name" name="last_Name" value={inputs.last_Name} onChange={handleChange} />
          <input type="text" placeholder="Email" name="email" value={inputs.email} onChange={handleChange} />
          <input type="text" placeholder="User Description" name="user_Description" value={inputs.user_Description} onChange={handleChange} />
          <input type="password" placeholder="Password" name="user_Password" value={inputs.user_Password} onChange={handleChange} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;