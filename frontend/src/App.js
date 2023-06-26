import Header from "./components/Header";
import React from "react";
import { BrowserRouter as Router, Route, Switch ,useHistory } from 'react-router-dom';
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import {useSelector} from "react-redux"

function App() {
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <React.Fragment>
      <header>
          <Header/>
      </header>
      <main>
        <Router>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/StudentDashboard" element={<StudentDashboard/>}/>

        </Router>

        

      </main>



    </React.Fragment>
    );
}

export default App;
