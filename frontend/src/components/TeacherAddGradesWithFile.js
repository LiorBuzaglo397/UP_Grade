import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';


const TeacherAddGradesWithFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const history = useHistory();


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post('https://upgradebyliorandnofar-api.onrender.com/api/grade/addGradeWithFile', formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        console.log(response.data);
        // Handle the response or show a success message
      }
    } catch (error) {
      console.error(error);
      // Handle the error or show an error message
    }
  };

  return (
    <div>      
      <Navbar />
    <div className='dashboard-div'>
      <h1>File Upload</h1>
      <br/>
      <input type="file" onChange={handleFileChange} />
      <br/>
      <button onClick={handleUpload} className='buttons'>Upload</button>
          <button onClick={() => history.goBack()} className='back-button'>
            Go Back
          </button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
    </div> 
       </div>
  );
};

export default TeacherAddGradesWithFile;
