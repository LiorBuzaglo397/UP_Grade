import React, { useState } from 'react';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [courseInfo, setCourseInfo] = useState('');

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    // Fetch students and course information for the selected course
    // Assuming data is retrieved from an API
    const courseStudents = {
      // Sample students data
      1: [
        { id: 1, name: 'Student 1' },
        { id: 2, name: 'Student 2' },
        { id: 3, name: 'Student 3' },
      ],
      2: [
        { id: 4, name: 'Student 4' },
        { id: 5, name: 'Student 5' },
      ],
      3: [
        { id: 6, name: 'Student 6' },
        { id: 7, name: 'Student 7' },
      ],
    };
    setStudents(courseStudents[course.id]);

    const courseData = {
      // Sample course information data
      1: { info: 'Mathematics course information' },
      2: { info: 'Physics course information' },
      3: { info: 'Chemistry course information' },
    };
    setCourseInfo(courseData[course.id].info);
  };

  const handleGradeUpdate = (studentId, newGrade) => {
    // Update grades for the selected student in the selected course
    // Assuming grade update functionality is handled by an API
    console.log(`Updated grade for student ${studentId}: ${newGrade}`);
  };

  const handleCourseEdit = () => {
    // Edit the course information for the selected course
    // Assuming course editing functionality is handled by an API
    console.log('Course edited');
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <h3>Courses</h3>
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
          <h4>Students</h4>
          <ul>
            {students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
          <h4>Course Information</h4>
          <p>{courseInfo}</p>
          <button onClick={handleCourseEdit}>Edit Course</button>

          <h4>Update Grades</h4>
          {students.map((student) => (
            <div key={student.id}>
              <label>
                Student: {student.name}
                <input
                  type="text"
                  onChange={(e) => handleGradeUpdate(student.id, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
