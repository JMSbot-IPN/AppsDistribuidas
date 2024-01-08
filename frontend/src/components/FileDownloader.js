import React, { useState } from 'react';
import axios from 'axios';

const FileDownloader = () => {
  const [fileName, setFileName] = useState('');

  const handleInputChange = (event) => {
    setFileName(event.target.value);
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/download?FileName=${fileName}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Descargar Archivos</h1>
      <input type="text" onChange={handleInputChange} placeholder="Nombre del Archivo" />
      <button onClick={downloadFile}>Descargar Archivo</button>
    </div>
  );
};

export default FileDownloader;
