import React from 'react';

const StudentDashboard = () => {
  // Retrieve student info from localStorage
  const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));

  return (
    <div>
      <h1>Welcome to the Student Dashboard</h1>
      <h2>Student Information:</h2>
      <p>Name: {studentInfo.first_Name}</p>
      <p>Email: {studentInfo.email}</p>

      {/* Other dashboard content */}
    </div>
  );
};

export default StudentDashboard;
