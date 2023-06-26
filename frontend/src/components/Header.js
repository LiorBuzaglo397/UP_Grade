import React from 'react';
import { BrowserRouter as Router, Route, Switch ,useHistory } from 'react-router-dom';
import Logo from './images/Logo.png';
import { Button } from 'bootstrap';
import {useSelector} from "react-redux"


function Header() {
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  return (
<Router>
      <div>
        <Switch>
        <div className='dashboard-div'>
                  <br></br>
                  <img className='dashboard-img' src={Logo} alt="logo" />
                  <h1>Welcome to UP-GRADE Website</h1><br></br>
                {!isLoggedIn &&
                <>
                <button>Login</button>
                  <br></br>
                  <br></br>
                  <button>Signup</button>
               </>   }

          </div>
        </Switch>
      </div>
    </Router>  )
}

export default Header