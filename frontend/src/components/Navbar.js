import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import Logo from './images/Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store'; // Update the import path for the logout action

const Navbar = ({ handleLogout }) => { // Add handleLogout as a prop

  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleLogoutClick = () => {
    window.location.href= "/";
  };

  return (
    <nav className="navbar">
      <img className="nav-img" src={Logo} alt="Logo" />
      <h3>The UP-GRADE website</h3>
      <div className="links">
        
            <Button onClick={handleLogoutClick} variant="outline-primary">Logout</Button> {/* Call handleLogoutClick on button click */}

      </div>
    </nav>
  );
};

export default Navbar;
