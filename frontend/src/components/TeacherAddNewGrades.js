import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const TeacherAddNewGrades = () => {
  const history = useHistory();

  const [assignmentType, setAssignmentType] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const storedGrades = localStorage.getItem('grades');
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const storedGrades = localStorage.getItem('grades');
        if (storedGrades) {
          const parsedGrades = JSON.parse(storedGrades);
          setGrades(parsedGrades);
        } else {
          setGrades([]);
        }
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, []);

  const handleAssignmentTypeChange = (e) => {
    const { value } = e.target;
    setAssignmentType(value);
  };

  const handleSelectAssignmentType = () => {
    // Check if the assignment type is already in the grades list
    const isAssignmentTypeExist = grades.some((grade) => grade.gradeType === assignmentType);

    if (!isAssignmentTypeExist) {
      const newGradeTypeNum = getLatestGradeTypeNum(assignmentType) + 1;
      const newGrade = {
        gradeType: assignmentType,
        gradeTypeNum: newGradeTypeNum,
        grades: [],
      };

      // Update the grades state with the new grade
      setGrades((prevGrades) => [...prevGrades, newGrade]);
    }

    // Handle any other logic for selecting the assignment type
  };

  const handleChange = (e, studentId) => {
    const { name, value } = e.target;
    const updatedGrades = grades.map((grade) => {
      if (grade.user_ID === studentId) {
        return { ...grade, grade: value };
      }
      return grade;
    });
    setGrades(updatedGrades);
  };

  const handleAddGrade = async () => {
    try {
      for (const student of grades) {
        const {
          user_ID,
          course_ID,
          semester_Year,
          semester_Num,
          gradeType,
          gradeTypeNum,
        } = student;
        // Get the grade value from the input field or set a default value
        const grade = student.grade || 0;
        const gradeUploadDate = new Date().toLocaleDateString('en-GB');
  
        // Prepare the data to be sent to the backend
        const data = {
          user_ID,
          course_ID,
          semester_Year,
          semester_Num,
          gradeType,
          gradeTypeNum,
          grade,
          gradeUploadDate,
        };
  
        // Send the data to the backend API endpoint
        await axios.post('http://localhost:5001/api/grade/add', data);
      }
  
      // Clear the grades in the state after successful submission
      setGrades([]);
      setIsSubmitDisabled(true);
  
      // Show popup for successful grade addition
      alert('Grades added successfully!');
  
      // Redirect to TeacherCourseGrades
      history.push('/TeacherCourseGrades');
    } catch (error) {
      console.error('Error adding grades:', error);
      // Handle and display the error to the user
      // ...
    }
  };
  

  const handleSubmit = () => {
    // Handle the logic for submitting grades
  };

  const getLatestGradeTypeNum = (assignmentType) => {
    const assignmentGradesOfType = grades.filter((grade) => grade.gradeType === assignmentType);
    const latestGradeTypeNum = Math.max(...assignmentGradesOfType.map((grade) => grade.gradeTypeNum), 0);
    return latestGradeTypeNum;
  };

  useEffect(() => {
    const isAllGradesEntered = grades.every((student) => student.grade !== '');
    setIsSubmitDisabled(!isAllGradesEntered);
  }, [grades]);
  const uniqueGrades = Array.from(new Set(grades.map((student) => student.user_ID)))
  .map((user_ID) => {
    return grades.find((student) => student.user_ID === user_ID);
  });

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
          {uniqueGrades.map((student) => (
            <tr key={student.user_ID}>
              <td>{student.user_ID}</td>
              <td>
                <input
                  type='number'
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
    </div>
  );
};

export default TeacherAddNewGrades;
