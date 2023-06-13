import React from 'react';

const GradesPage = ({ course }) => {
  const grades = [
    { id: 1, course: 'Mathematics', date: '2023-05-30', type: 'Test', grade: 'A' },
    { id: 2, course: 'Mathematics', date: '2023-06-02', type: 'Exercise', grade: 'B+' },
    { id: 3, course: 'Mathematics', date: '2023-06-05', type: 'Lab', grade: 'A-' },
  ];

  const filteredGrades = grades.filter((grade) => grade.course === course.name);

  return (
    <div className='table-wrapper'>
      <h2>Grades for {course.name}</h2>
      {filteredGrades.map((grade) => (
        <table key={grade.id} className='grade-table'>
          <thead>
            <tr>
              <th>Course</th>
              <th>Date of Submission</th>
              <th>Type</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{grade.course}</td>
              <td>{grade.date}</td>
              <td>{grade.type}</td>
              <td>{grade.grade}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default GradesPage;



/*
import React from 'react';

const GradesPage = ({ course }) => {
  const grades = [
    { id: 1, course: 'Mathematics', date: '2023-05-30', type: 'Test', grade: 'A' },
    { id: 2, course: 'Mathematics', date: '2023-06-02', type: 'Exercise', grade: 'B+' },
    { id: 3, course: 'Mathematics', date: '2023-06-05', type: 'Lab', grade: 'A-' },
  ];

  const filteredGrades = grades.filter((grade) => grade.course === course.name);

  return (
    <div>
      <h2>Grades for {course.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Date of Submission</th>
            <th>Type</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.course}</td>
              <td>{grade.date}</td>
              <td>{grade.type}</td>
              <td>{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesPage;
*/