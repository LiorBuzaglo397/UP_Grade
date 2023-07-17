import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

export default function TeacherCoursesAssignment() {
  const [assignments, setAssignments] = useState([]);
  const { course_ID, semester_Year, semester_Num ,course_Name } = useParams();
  const history = useHistory();
  const [newlyAddedRows, setNewlyAddedRows] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [gradeUploadMethod, setGradeUploadMethod] = useState(null); // State to store the selected grade upload method
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null); // New state variable to store the selected assignment ID
  const selectedCourse = localStorage.getItem('selectedCourse');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
console.log(course_Name);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        console.log(course_ID);
        const response = await axios.get('https://upgradebyliorandnofar-api.onrender.com/api/assignment/getAllAssignmentByCourseID', {
          params: {
            course_ID: course_ID ,
          },
        });
        const assignmentData = response.data.assignments;
        setAssignments(assignmentData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignment();
  }, []);

  const handleSave = async () => {
    try {
      const updatedAssignments = assignments.map((assignment) => {
        return {
          _id: assignment._id,
          assignment_Name: assignment.assignment_Name,
          upload_Date: assignment.upload_Date,
          type: assignment.type,
        };
      });

      const newAssignments = newlyAddedRows.map((newAssignment) => {
        return {
          course_ID: newAssignment.course_ID,
          assignment_Name: newAssignment.assignment_Name,
          upload_Date: newAssignment.upload_Date,
          type: newAssignment.type,
        };
      });

      const response = await axios.post('https://upgradebyliorandnofar-api.onrender.com/api/assignment/addOrUpdateAssignment', {
        course_ID: course_ID,
        assignments: updatedAssignments.concat(newAssignments),
      });
      localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));

      window.alert('Assignments saved successfully');
    } catch (error) {
      console.error('Error saving assignments:', error);
      window.alert('Error saving assignments');
    }
  };

  const handleAssignmentUpdate = (assignmentId, field, value) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) => {
        if (assignmentId && assignment._id === assignmentId) {
          return { ...assignment, [field]: value };
        }
        return assignment;
      })
    );

    setNewlyAddedRows((prevNewlyAddedRows) =>
      prevNewlyAddedRows.map((newlyAddedRow) => {
        if (newlyAddedRow._id === assignmentId) {
          return { ...newlyAddedRow, [field]: value };
        }
        return newlyAddedRow;
      })
    );
  };

  const addNewAssignment = async (newAssignment) => {
    try {
      const response = await axios.post('https://upgradebyliorandnofar-api.onrender.com/api/assignment/addAssignment', newAssignment);
      console.log('Assignment added:', response.data);
      setAssignments((prevAssignments) => [...prevAssignments, response.data.assignment]);
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  const handleAddAssignment = () => {
    if (newlyAddedRows.length > 0) {
      window.alert('Please save or cancel the current new assignment before adding another one.');
      return;
    }
  
    const newRow = {
      course_ID: course_ID,
      assignment_Name: '',
      upload_Date: '',
      type: 'hw',
    };
  
    setNewlyAddedRows([newRow]);
    addNewAssignment(newRow);
  };

  const handleAddManually = (assignmentId) => {
    const selectedAssignment = assignments.find((assignment) => assignment._id === assignmentId);
    console.log(selectedAssignment);
    if (selectedAssignment) {
      // Store the assignment in localStorage
      localStorage.setItem('selectedAssignment', JSON.stringify(selectedAssignment));
      console.log(semester_Year);
      // Redirect to TeacherAddNewGrades component
      localStorage.setItem('courseId', JSON.stringify(course_ID));
      localStorage.setItem('course_ID', JSON.stringify(course_ID));
      localStorage.setItem('gradeType', JSON.stringify(selectedAssignment.type));
      localStorage.setItem('semester_Year', JSON.stringify(semester_Year));
      localStorage.setItem('semester_Num', JSON.stringify(semester_Num));
      localStorage.setItem('upload_Date', JSON.stringify(selectedAssignment.upload_Date));

      history.push('/TeacherAddNewGrades');
    }
  };
  
  

  const handleAddFile = () => {
    setGradeUploadMethod('Add File');
    closeModal();
    history.push('/TeacherAddGradesWithFile'); // Redirect to TeacherAddGradesWithFile component
  };


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className='table-wrapper'>
        <h2>Teacher {course_Name} Course Assignments</h2>
        <table className='assignment-table'>
          <thead>
            <tr>
              <th>Course</th>
              <th>Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Grades</th>
            </tr>
          </thead>
          <tbody>
          {assignments.concat(newlyAddedRows).map((assignment) => (
  <tr key={assignment._id}>
    <td>{course_Name}</td>
    <td>
      <input
        type='text'
        value={assignment.assignment_Name}
        onChange={(e) => handleAssignmentUpdate(assignment._id, 'assignment_Name', e.target.value)}
      />
    </td>
    <td>
      <input
        type='date'
        value={assignment.upload_Date}
        onChange={(e) => handleAssignmentUpdate(assignment._id, 'upload_Date', e.target.value)}
      />
    </td>
    <td>
      <select
        value={assignment.type}
        onChange={(e) => handleAssignmentUpdate(assignment._id, 'type', e.target.value)}
      >
        <option value='test'>Test</option>
        <option value='hw'>Homework</option>
        <option value='lab'>Lab</option>
      </select>
    </td>
    <td>
    <button  onClick={() => {
  setSelectedAssignmentId(assignment._id); // Set the selected assignment ID
  openModal();
}} className='buttons'>Upload grades</button>    </td>
  </tr>
))}
          </tbody>
        </table>
        <div >
          <button onClick={handleAddAssignment} className='buttons'>New Assignment</button>
          <button onClick={handleSave} className='buttons'>Save</button>
          <br/>
          <button onClick={() => history.goBack()} className='back-button'>
            Go Back
          </button>
        </div>
      </div>
      <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-overlay" overlayClassName="modal-overlay">
  <div className="modal-content">
    <h2>Choose Upload Option:</h2>
    <h3>How would you like to add the grades?</h3>
    <div className="button-container">
      {selectedAssignmentId && (
        <button onClick={() => handleAddManually(selectedAssignmentId) } className='buttons'>Upload grades</button>
      )}
      <button onClick={handleAddFile} className='buttons'>Add File</button>
    </div>
  </div>
</Modal>
      {gradeUploadMethod && (
        <p>
          Preferred Upload Method: <strong>{gradeUploadMethod}</strong>
        </p>
      )}
              <br/>
          <button onClick={() => history.goBack()} className='back-button'>
            Go Back
          </button>
    </div>
  );
}
