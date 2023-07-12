import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';

function TeacherCourseGrades() {

  




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
    <div>
        <Navbar /> 
        <div className='table-wrapper'>
        <h2>Teacher { course } Course Assignments</h2>
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

        <button onClick={() => history.goBack()} className='back-button'>Go Back</button>
        
        </div>
    </div>
    
  );
}

export default TeacherCourseGrades