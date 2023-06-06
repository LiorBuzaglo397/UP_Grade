import React, { useState } from 'react';
import GradesPage from './GradesPage';
import GradeDistributionPage from './GradeDistributionPage';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Upload the file to the server
    // Assuming file upload functionality is handled by an API
    console.log('File uploaded:', file);
  };

  const renderGradesPage = () => {
    return selectedCourse ? (
      <GradesPage course={selectedCourse} />
    ) : (
      <p>Please select a course to view grades.</p>
    );
  };

  const renderGradeDistributionPage = () => {
    return selectedCourse ? (
      <GradeDistributionPage course={selectedCourse} />
    ) : (
      <p>Please select a course to view grade distribution.</p>
    );
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <h3>Your Courses:</h3>
      <ul>
        {courses.map((course) => (
          <button key={course.id} onClick={() => handleCourseSelect(course)}>
            {course.name}
          </button>
        ))}
      </ul>

      {selectedCourse && (
        <div>
          <h4>Selected Course: {selectedCourse.name}</h4>
          <h4>Grades</h4>
          {renderGradesPage()}
          <input type="file" onChange={handleFileUpload} />

          <h4>Grade Distribution</h4>
          {renderGradeDistributionPage()}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
