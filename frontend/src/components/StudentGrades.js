import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar';

const StudentGrades = () => {
  // const { course_ID, semester_Year, semester_Num } = JSON.parse(localStorage.getItem('studentGradesParams'));
  
  const studentInfo = JSON.parse(localStorage.getItem('userInfo'));
  const selectedCourse = JSON.parse(localStorage.getItem('selectedCourse'));

  const [grades, setGrades] = useState([]);
  const { course_ID, semester_Year, semester_Num , course_Name } = useParams();
  console.log(course_ID);
  const history = useHistory();
  const [filteredGrades, setFilteredGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/grade/getGradesByCourseIDForStudent?user_ID=${studentInfo._id}&course_ID=${course_ID}&semester_Year=${semester_Year}&semester_Num=${semester_Num}`);
        console.log(response.data.grades);
        const gradesData = response.data.grades;
        setGrades(gradesData);
        // Fetch assignment details for each grade
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };
  
    fetchGrades();
  }, [course_ID, semester_Num, semester_Year, studentInfo._id]);

  useEffect(() => {
    if (Array.isArray(grades)) {
      const filtered = grades.filter((grade) => grade.course_ID === course_ID);
      setFilteredGrades(filtered);
    }
  }, [grades, course_ID]);

  const calculateStatistics = (grades) => {
    const numStudents = grades.length;
  
    // Calculate average grade
    const sum = grades.reduce((total, grade) => total + grade.grade, 0);
    const averageGrade = numStudents > 0 ? sum / numStudents : 0;
  
    // Calculate median grade
    const sortedGrades = grades.map((grade) => grade.grade).sort((a, b) => a - b);
    const middleIndex = Math.floor(numStudents / 2);
    const medianGrade = numStudents % 2 === 0 ? (sortedGrades[middleIndex - 1] + sortedGrades[middleIndex]) / 2 : sortedGrades[middleIndex];
  
    // Calculate standard deviation
    const deviations = grades.map((grade) => Math.pow(grade.grade - averageGrade, 2));
    const variance = deviations.reduce((total, deviation) => total + deviation, 0) / numStudents;
    const standardDeviation = Math.sqrt(variance);
  
    // Calculate highest and lowest grade
    const sortedGradesCopy = [...sortedGrades];
    const highestGrade = sortedGradesCopy.pop();
    const lowestGrade = sortedGradesCopy.shift();
  
    return {
      numStudents,
      averageGrade,
      medianGrade,
      standardDeviation,
      highestGrade,
      lowestGrade,
    };
  };
  
  const handleStatsClick = async (assignmentId, assignmentName) => {
    try {
      const response = await axios.get('http://localhost:5001/api/grade/getGradesByCourseID', {
        params: {
          Assingment_Name: assignmentName,
          course_ID,
          semester_Year,
          semester_Num
        }
      });
  
      const grades = response.data.grades;
  
      // Perform any necessary calculations or data manipulation
      const statistics = calculateStatistics(grades);

      const listOfgrades = grades.map((grade) => grade.grade);
      console.log(typeof listOfgrades);
      console.log(Array.isArray(grades));

      //localStorage.setItem('grades', JSON.stringify(listOfgrades));

      // Redirect to the stats page with the calculated statistics and the listOfgrades
      history.push(`/stats?assignmentId=${assignmentId}&assignment=${assignmentName}&numStudents=${statistics.numStudents}&averageGrade=${statistics.averageGrade}&medianGrade=${statistics.medianGrade}&standardDeviation=${statistics.standardDeviation}&highestGrade=${statistics.highestGrade}&lowestGrade=${statistics.lowestGrade}&listOfgrades=${listOfgrades}`);
      
    } catch (error) {
      console.error('Error fetching grades:', error);
      // Handle the error appropriately
    }
  };

  // Function to format the gradeUploadDate as "dd/mm/yyyy"
  const formatDate = (uploadDate) => {
    const date = new Date(uploadDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Navbar />
      <div className='table-wrapper'>
        <br />
        <h2>Grades for {course_Name}</h2>
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
                <td>{grade.Assingment_Name}</td>
                <td>{formatDate(grade.gradeUploadDate)}</td>
                <td>{grade.gradeType}</td>
                <td>{grade.grade}</td>
                <td>
                  <Button onClick={() => handleStatsClick(grade.id, grade.Assingment_Name)} variant='primary'>
                    View stats
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
        <br />
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StudentGrades;
