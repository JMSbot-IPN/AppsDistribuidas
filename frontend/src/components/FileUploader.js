import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Subir Archivos</h1>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={uploadFile}>Subir Archivo</button>
    </div>
  );
};

export default FileUploader;
