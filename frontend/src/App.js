// App.js
import React from 'react';
import FileUploader from './components/FileUploader';
import FileDownloader from './components/FileDownloader';

function App() {
  return (
    <div>
      <FileUploader />
      <FileDownloader />
    </div>
  );
}

export default App;