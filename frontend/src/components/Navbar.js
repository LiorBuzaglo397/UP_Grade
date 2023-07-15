import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import Logo from './images/Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store'; // Update the import path for the logout action

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleLogout = () => {
    // Perform necessary logout actions (clearing user info, etc.)
    dispatch(logout());
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('teacherInfo');
    history.push('/'); // Redirect to the home page after logout
  };

  return (

    <nav className="navbar">
      <img className="nav-img" src={Logo} alt="Logo" />
      <h3>The UP-GRADE website</h3>
      <div className="links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/student-dashboard">Courses</Link>
            <Link to="/teacher-dashboard">Teacher Courses</Link>
            <Button onClick={handleLogout} variant="outline-primary">Logout</Button>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;