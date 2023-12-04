import React, { useState } from 'react';
import axios from 'axios';

const CrowdDetection = () => {
  const [file, setFile] = useState(null);
  const [threshold, setThreshold] = useState(0);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('threshold', threshold);

    try {
      const response = await axios.post('https://safehive-backend.onrender.com/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Image Processing App</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <label>
        Threshold:
        <input type="number" value={threshold} onChange={handleThresholdChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Process Image</button>

      {result && (
        <div>
          <h2>Results</h2>
          <p>Estimated Count: {result.estimatedCount}</p>
          <p>Crowd Status: {result.crowdStatus}</p>
          <p>Crowd Density Frequency: {result.crowdDensityFrequency}</p>
          <img src={`https://safehive-backend.onrender.com${result.crowdDensity}`} alt="Crowd Density" />
        </div>
      )}
    </div>
  );
};

export default CrowdDetection;
