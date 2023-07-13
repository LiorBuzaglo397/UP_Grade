import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const TeacherAddNewGrades = ({ grades }) => {
  const history = useHistory();

  const [gradeslist, setGradeslist] = useState(grades);
  const [assignmentType, setAssignmentType] = useState('');
  const [assignmentGrades, setAssignmentGrades] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US');
    setGradeslist((prevGrades) =>
      prevGrades.map((student) => ({
        ...student,
        gradeUploadDate: currentDate,
      }))
    );
  }, []);

  const handleChange = (e, studentId) => {
    const { name, value } = e.target;

    setGradeslist((prevGrades) => {
      const updatedGrades = prevGrades.map((student) => {
        if (student.user_ID === studentId) {
          return {
            ...student,
            [name]: value,
          };
        }
        return student;
      });

      return updatedGrades;
    });
  };

  const handleAssignmentTypeChange = (e) => {
    const { value } = e.target;
    setAssignmentType(value);
  };

  const handleAddGrade = () => {
    const updatedGrades = gradeslist.map((student) => {
      const grade = assignmentGrades[student.user_ID] || '';
      return {
        ...student,
        grade,
      };
    });

    setGradeslist(updatedGrades);
  };

  const handleSelectAssignmentType = () => {
    const latestGradeTypeNum = getLatestGradeTypeNum(assignmentType);
    setAssignmentGrades((prevGrades) => ({
      ...prevGrades,
      [assignmentType]: latestGradeTypeNum + 1,
    }));
  };

  const handleSubmit = () => {
    // Your submit logic here
  };

  const getLatestGradeTypeNum = (assignmentType) => {
    const assignmentGradesOfType = gradeslist.filter((grade) => grade.gradeType === assignmentType);
    const latestGradeTypeNum = Math.max(...assignmentGradesOfType.map((grade) => grade.gradeTypeNum));
    return latestGradeTypeNum;
  };

  useEffect(() => {
    const isAllGradesEntered = gradeslist.every((student) => student.grade !== '');
    setIsSubmitDisabled(!isAllGradesEntered);
  }, [gradeslist]);

  return (
    <div className='table-wrapper'>
      <h1>Add New Grades</h1>
      <div>
        <label htmlFor='assignmentType'>Assignment Type:</label>
        <select id='assignmentType' value={assignmentType} onChange={handleAssignmentTypeChange}>
          <option value=''>Select Assignment Type</option>
          <option value='hw'>Homework</option>
          <option value='test'>Test</option>
          <option value='Lab'>Lab</option>
        </select>
        <Button onClick={handleSelectAssignmentType} disabled={!assignmentType}>
          Select
        </Button>
      </div>
      <table className='grade-table'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {gradeslist.map((student) => (
            <tr key={student.user_ID}>
              <td>{student.user_ID}</td>
              <td>
                <input
                  type='number'
                  min='0'
                  max='100'
                  value={student.grade}
                  onChange={(e) => handleChange(e, student.user_ID)}
                  name='grade'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={handleAddGrade} disabled={isSubmitDisabled}>
          Add Grade
        </Button>
      </div>
      <div>
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          Submit Grades
        </Button>
      </div>
    </div>
  );
};

export default TeacherAddNewGrades;
