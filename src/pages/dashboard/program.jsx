import React, { useState } from 'react';
import axios from 'axios';
import CrowdDetection from '@/widgets/cards/CrowdDetection'; // Import the CrowdDetection component
import { Button } from "@material-tailwind/react";

export function Program({ onClose }) {
  const [file, setFile] = useState(null);
  const [threshold, setThreshold] = useState(0);
  const [result, setResult] = useState(null);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleThresholdSubmit = async (newThreshold) => {
    setThreshold(newThreshold);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('threshold', newThreshold);

    try {
      const response = await axios.post('http://172.172.166.26:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        const result = response.data;
        setResult(result);
      } else {
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
   
      <CrowdDetection // Render CrowdDetection component with the relevant props
        file={file}
        threshold={threshold}
        result={result}
        onFileChange={handleFileChange}
        onThresholdSubmit={handleThresholdSubmit}
      />

    </div>
  );
}

export default Program;
