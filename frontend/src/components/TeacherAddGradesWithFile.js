import React, { useState } from 'react';
import axios from 'axios';

const TeacherAddGradesWithFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post('http://localhost:5001/api/grade/addGradeWithFile', formData, {
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
    <div className='table-wrapper'>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
    </div>
  );
};

export default TeacherAddGradesWithFile;
