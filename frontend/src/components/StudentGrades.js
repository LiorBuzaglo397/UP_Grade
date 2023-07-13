import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const StudentGrades = () => {
  const { course_ID, semester_Year, semester_Num } = JSON.parse(localStorage.getItem('studentGradesParams'));
  const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));

  const CourseInfo = {
    course_ID,
    semester_Year,
    semester_Num,
  };

  const [grades, setGrades] = useState([]);
  const { course } = useParams();
  const history = useHistory();
  const [filteredGrades, setFilteredGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/grade/getGradesByCourseIDForStudent?user_ID=${studentInfo.user_ID}&course_ID=${CourseInfo.course_ID}&semester_Year=${CourseInfo.semester_Year}&semester_Num=${CourseInfo.semester_Num}`);
        console.log(response.data);
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [CourseInfo.course_ID, CourseInfo.semester_Num, CourseInfo.semester_Year, studentInfo.user_ID]);

  useEffect(() => {
    if (Array.isArray(grades)) {
      const filtered = grades.filter((grade) => grade.course_ID === course);
      setFilteredGrades(filtered);
    }
  }, [grades, course]);

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
  
  
  const handleStatsClick = (assignmentId) => {
    // Find the selected grade based on assignmentId
    const selectedGrade = filteredGrades.find((grade) => grade.assignmentId === assignmentId);
  
    if (selectedGrade) {
      const statistics = calculateStatistics(filteredGrades);
  
      const searchParams = new URLSearchParams({
        assignmentId: selectedGrade.assignmentId,
        assignment: selectedGrade.assignment,
        numStudents: statistics.numStudents,
        averageGrade: statistics.averageGrade,
        medianGrade: statistics.medianGrade,
        standardDeviation: statistics.standardDeviation,
        highestGrade: statistics.highestGrade,
        lowestGrade: statistics.lowestGrade,
      });
  
      history.push(`/stats-grades?${searchParams.toString()}`);
    }
  };
  
  
  return (
    <div>
      <div className='table-wrapper'>
        <br />
        <h2>Grades for {course}</h2>
        {grades.length > 0 ? (
          <table className='grade-table'>
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
              {grades.map((grade) => (
                <tr key={grade._id}>
                  <td>{grade.gradeType}</td>
                  <td>{grade.gradeUploadDate}</td>
                  <td>{grade.gradeType}</td>
                  <td>{grade.grade}</td>
                  <td>
                    <Button onClick={() => handleStatsClick(grade._id, grade.gradeType)} variant='primary'>
                      View stats
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No grades available for this course.</p>
        )}
        <br />
        <button onClick={() => history.goBack()} className='back-button'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StudentGrades;
