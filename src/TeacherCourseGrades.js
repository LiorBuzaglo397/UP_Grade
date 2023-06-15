import React, { useState } from 'react';

const TeacherCourseGrades = ({ course }) => {
  const [grades, setGrades] = useState([
    { id: 1, name: 'Student 1', date: '2023-06-01', type: 'test', grade: 80 },
    { id: 2, name: 'Student 2', date: '2023-06-03', type: 'exercise', grade: 90 },
    { id: 3, name: 'Student 3', date: '2023-06-05', type: 'lab', grade: 95 },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, course: 'Mathematics', name: 'Mathematics Test 1', date: '2023-05-30', type: 'Test' },
    { id: 2, course: 'Mathematics', name: 'Ex1 Math', date: '2023-06-02', type: 'Exercise' },
    { id: 3, course: 'Mathematics', name: 'Lab1 Math', date: '2023-06-05', type: 'Lab' },
    { id: 4, course: 'Mathematics', name: 'Lab2 Math', date: '2023-08-05', type: 'Lab' },
  ]);

  const filteredAssignments = assignments.filter((assignment) => assignment.course === course.name);


  const handleGradeUpdate = (studentId, field, value) => {
    setGrades((prevGrades) =>
      prevGrades.map((grade) => {
        if (grade.id === studentId) {
          return { ...grade, [field]: value };
        }
        return grade;
      })
    );
  };

  const handleAddRow = () => {
    const newRow = { id: Date.now(), name: '', date: '', type: '', grade: 0 };
    setGrades((prevGrades) => [...prevGrades, newRow]);
  };

  const handleSave = () => {
    // Assuming you have an API to save the grades to the database
    console.log('Saving grades:', grades);
  };

 
 
  const handleAssignmentUpdate = (assignmentId, field, value) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) => {
        if (assignment.id === assignmentId) {
          return { ...assignment, [field]: value };
        }
        return assignment;
      })
    );
  };

  const handleAddAssignment = () => {
    const newRow = { id: Date.now(), course: course, name: '', date: '', type: '', grades: <button></button> };
    setAssignments((prevAssignments) => [...prevAssignments, newRow]);
  };

  
  const uploadStudentsGrades = (course) =>{
    return (
        <div className='table-wrapper'>
          <h2>Teacher Course Grades</h2>
          <table className='grade-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>
                    <input
                      type="text"
                      value={grade.name}
                      onChange={(e) => handleGradeUpdate(grade.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={grade.date}
                      onChange={(e) => handleGradeUpdate(grade.id, 'date', e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={grade.type}
                      onChange={(e) => handleGradeUpdate(grade.id, 'type', e.target.value)}
                    >
                      <option value="test">Test</option>
                      <option value="exercise">Exercise</option>
                      <option value="lab">Lab</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={grade.grade}
                      onChange={(e) => handleGradeUpdate(grade.id, 'grade', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddRow}>Add a new task</button>
          <button onClick={handleSave}>Save</button>
        </div>
      );

  }

 

  return (
    <div className='table-wrapper'>
      <h2>Teacher Course Assignments</h2>
      <table className='grade-table'>
        <thead>
          <tr>
            <th>Course</th>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>grades</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>
                {assignment.course}
              </td>
              <td>
                <input
                  type="text"
                  value={assignment.name}
                  onChange={(e) => handleAssignmentUpdate(assignment.id, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={assignment.date}
                  onChange={(e) => handleAssignmentUpdate(assignment.id, 'date', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={assignment.type}
                  onChange={(e) => handleAssignmentUpdate(assignment.id, 'type', e.target.value)}
                >
                  <option value="test">Test</option>
                  <option value="exercise">Exercise</option>
                  <option value="lab">Lab</option>
                </select>
              </td>
              <td>
                <button on onClick={() => uploadStudentsGrades(assignment.course)}>Upload grades</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddAssignment}>New Assignment</button>
      <button onClick={handleSave}>Save</button>
      
    </div>
  );
};

export default TeacherCourseGrades;
