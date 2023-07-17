import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar';

const TeacherAddNewGrades = () => {
  const history = useHistory();
  const location = useLocation();
  const courseId = localStorage.getItem('courseId');
  const [assignment, setAssignment] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const storedGrades = localStorage.getItem('grades');
  const [studentInfo, setStudentInfo] = useState([]);
  //selectedCourse
  const selectedCourse = localStorage.getItem('selectedCourse');

  const course_ID = localStorage.getItem('course_ID');
  const semester_Year = localStorage.getItem('semester_Year');
  const semester_Num = localStorage.getItem('semester_Num');
  const gradeType = localStorage.getItem('gradeType');
  const gradeTypeNum = localStorage.getItem('gradeTypeNum');
  const upload_Date = localStorage.getItem('upload_Date');

  //upload_Date
console.log(semester_Num);


  useEffect(() => {
    const selectedAssignment = localStorage.getItem('selectedAssignment');
    if (selectedAssignment) {
      const assignment = JSON.parse(selectedAssignment);
      setAssignment(assignment);
    }
  }, []);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/course/getUserByCourseInfo', {
          params: {
            _id: courseId.replace(/"/g, ''), 
          },
        });

        const userData = response.data.users;
        setStudentInfo(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentInfo();
  }, []);

  const handleGradeChange = (e, studentId) => {
    const { value } = e.target;
    const updatedStudentInfo = studentInfo.map((student) => {
      if (student._id === studentId) {
        return { ...student, grade: value };
      }
      return student;
    });
    setStudentInfo(updatedStudentInfo);
  };
  useEffect(() => {
    const isAllGradesEntered = studentInfo.every((student) => student.grade !== '');
    setIsSubmitDisabled(!isAllGradesEntered);
  }, [studentInfo]);

  const handleAddAllGrades = async () => {
    try {
      const assignment = JSON.parse(localStorage.getItem('selectedAssignment'));
      const assignmentName = assignment.assignment_Name;
  
      for (const student of studentInfo) {
        if (!student.grade) continue;
  
        const {
          _id: studentId,
          grade,
        } = student;
  
        await axios.post('http://localhost:5001/api/grade/add', {
          Assingment_Name : assignmentName,
          user_ID: studentId,
          course_ID: course_ID.replace(/"/g, ''),
          semester_Year: semester_Year.replace(/"/g, ''),
          semester_Num: semester_Num.replace(/"/g, ''),
          gradeType: gradeType ? gradeType.replace(/"/g, '') : null,
          gradeTypeNum: 1,
          grade: grade.replace(/"/g, ''),
          gradeUploadDate: new Date(),
                });
      }
  
      setStudentInfo([]);
      setIsSubmitDisabled(true);
  
      alert('Grades added successfully!');
      history.push('/TeacherDashboard');
    } catch (error) {
      console.error('Error adding grades:', error);
    }
  };
  
  
  

  return (
    <div>
      <Navbar />
      <div className='table-wrapper'>
        <h2>Add New Grades</h2>
        <table className='assignment-table'>
          <thead>
            <tr>
              <th>Assignment Name</th>
              <th>Student ID</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentInfo.map((student) => (
              <tr key={student._id}>
                <td>{assignment.assignment_Name}</td>
                <td>{student.user_ID}</td>
                <td>
                  <input
                    type='number'
                    value={student.grade || ''}
                    onChange={(e) => handleGradeChange(e, student._id)}
                    name='grade'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handleAddAllGrades} disabled={isSubmitDisabled}className='buttons'>
            Add All Grades
          </button>
          <br/>
          <button onClick={() => history.goBack()} className='back-button'>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddNewGrades;
