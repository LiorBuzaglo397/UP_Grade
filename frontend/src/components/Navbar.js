import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Logo from './images/Logo.png';


const Navbar = ({ handleLogout }) => {
    return (
      <nav className="navbar">
        <img className='nav-img' src={Logo}></img>
        <h3> The UP-GRADE website</h3>
        <div className="links">
        <Link to="/">Home</Link>
        <Link to="/student-dashboard">Courses</Link>
        <Link to="/teacher-dashboard">teacher Courses</Link>
          <Button onClick={handleLogout} variant="outline-primary">Logout</Button>
        </div>
      </nav>
    );
  };  
 
export default Navbar;



/**
  <Link to="/">Home</Link>
  <Link to="/courses">My Courses</Link> 
 
 */