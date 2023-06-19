import React, { useState } from 'react';


const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className='login-div'>
      <img src='https://imgtr.ee/images/2023/06/01/S83jq.png' alt="logo" />
      <div className="login-container">
        <h1>Login to the system</h1>
        <form onSubmit={handleLoginFormSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
