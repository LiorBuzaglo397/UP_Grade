import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const StudentGrades = () =>{
  return (
    <div>
      <Navbar />
      <div className='table-wrapper'>
        <br></br>
        <h2>Grades for {course}</h2>
        {filteredGrades.map((grade) => (
          <table key={grade.id} className='grade-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Submission</th>
                <th>Type</th>
                <th>Grade</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{grade.name}</td>
                <td>{grade.date}</td>
                <td>{grade.type}</td>
                <td>{grade.grade}</td>
                <td>
                  <Button onClick={() => handleStatsClick(grade.id,grade.name)} variant='primary'>
                    View stats
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
        <br></br>
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};


export default StudentGrades