import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Logo from './images/Logo.png';
import { useSelector } from 'react-redux';

function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/Login');
  };

  const handleSignupClick = () => {
    history.push('/SignUp');
  };

  return (
    <div className='dashboard-div'>
      <br />
      <img className='dashboard-img' src={Logo} alt='logo' />
      <h1>Welcome to UP-GRADE Website</h1>
      <br />
      <Router>
        <Switch>
          <Route exact path='/'>
            <div className='button-container'>
              <button className='header-button' onClick={handleLoginClick}>Login</button>
              <button className='header-button' onClick={handleSignupClick}>Signup</button>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Header;