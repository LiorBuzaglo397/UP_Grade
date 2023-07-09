import React from 'react'

const StudentDashboard = ()=> {
  return (
    <div>
    <h2>Student Dashboard</h2>
    <h3>Your Courses:</h3>
    <ul>
      {courses.map((course) => (
        <Link to={`/student-grades/${course.name}`} key={course.id}>
          <button>
            {course.name}
          </button>
        </Link>
      ))}
    </ul>


  </div>
);
  
}

export default StudentDashboard