import Header from "./components/Header";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StudentDashboard from "./components/StudentDashboard";
import StudentGrades from "./components/StudentGrades";
import StatsGrades from "./components/StatsGrades";
import GradeDistributionPage from "./components/GradeDistributionPage";
import TeacherDashboard from "./components/TeacherDashboard";
import TeacherCourseGrades from "./components/TeacherCourseGrades";
import TeacherAddNewGrades from "./components/TeacherAddNewGrades" 

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
            <Route path="/StudentGrades" component={StudentGrades} />
            <Route path="/StatsGrades" component={StatsGrades} />

            <Route path="/GradeDistributionPage" component={GradeDistributionPage} />
            <Route path="/TeacherDashboard" component={TeacherDashboard} />
            <Route path="/TeacherCourseGrades" component={TeacherCourseGrades} />
            <Route path="/TeacherAddNewGrades" component={TeacherAddNewGrades} />


          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;