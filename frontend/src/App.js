import Header from "./components/Header";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StudentDashboard from "./components/StudentDashboard";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <React.Fragment>
      <Router>
        <header>
          <Header/>
        </header>
        <main>
          <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/StudentDashboard" component={StudentDashboard} />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;