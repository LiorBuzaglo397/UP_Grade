import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';

/****************   Login   **********************/ 
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login validation
    // Here, we simply check if the user is logged in
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (          
        <div>
          <Navbar />
          <h1>Welcome to UP-GRADE Website</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login to the system</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
