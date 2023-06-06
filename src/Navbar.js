import React from 'react';
import Button from 'react-bootstrap/Button';

const Navbar = ({ handleLogout }) => {
    return (
      <nav className="navbar">
        <img className='nav-img' src="https://imgtr.ee/images/2023/06/01/S83jq.th.png"></img>
        <h3> The UP-GRADE website</h3>
        <div className="links">
          <a href="/">Home</a>
          <a href="/create">New Course</a>
          <Button onClick={handleLogout} variant="outline-primary">Logout</Button>
        </div>
      </nav>
    );
  };  
 
export default Navbar;
