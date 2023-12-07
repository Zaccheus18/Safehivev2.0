import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Input, Button, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import LoadingOverlay from "./layouts/LoadingOverlay.jsx";
import "./layouts/style.css";

const CrowdDetection = () => {
  const [file, setFile] = useState(null);
  const [threshold, setThreshold] = useState(0);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPromptMessage, setShowPromptMessage] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [promptBlinkingClass, setPromptBlinkingClass] = useState('');
  
  const getBorderStyle = (freq) => {
    let baseStyle = `mx-2 border-8`;
  
    if (freq === "Low") {
      return `${baseStyle} border-green-500 hazard-border-green`;
    } else if (freq === "Medium") {
      return `${baseStyle} border-yellow-500 hazard-border-yellow`;
    } else if (freq === "High") {
      return `${baseStyle} border-red-500 hazard-border-red`;
    }
  
    return ""; 
  };

  const getMessageAndClass = (freq) => {
    let message = '';
    let blinkingClass = '';

    if (freq === "Low") {
      message = "Analysis complete! The place is safe and not crowded.";
      blinkingClass = "blink-green";
    } else if (freq === "Medium") {
      message = "Stay vigilant! The place is slightly crowded";
      blinkingClass = "blink-yellow";
    } else if (freq === "High") {
      message = "Caution! The place is overcrowded and prone to stampede.";
      blinkingClass = "blink-red";
    }

    return { message, blinkingClass };
  };

  const { message, blinkingClass } = getMessageAndClass(result?.crowdDensityFrequency || '');


  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async () => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('threshold', threshold);

    setProcessing(true);

    try {
      setLoading(true);

      const response = await axios.post('http://172.172.166.26:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred.');
    } finally {
      setProcessing(false);
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setFile(null);
    setThreshold(0);
    setResult(null);
    setError(null);
  };

  return (
    <div className={`flex flex-col md:flex-row items-stretch my-5 ${result && getBorderStyle(result.crowdDensityFrequency)}`}>

      <div className="w-full md:w-2/3 p-5">
      <LoadingOverlay loading={loading} />
        <Card className="border-dashed border-2 p-5 mb-5 w-full h-full">
          <div
            className="h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleUploadClick}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
            <CameraIcon className="h-10 w-10 mb-2 text-indigo-500" />
            <Typography color="indigo">Drag and drop or click to upload</Typography>
          </div>
          <br />
          <div className='border border-blue-gray-200 p-4 rounded-lg grid grid-cols-2 gap-4 flex items-center'>
            {file ? (
              <div>
                <img src={URL.createObjectURL(file)} alt="Uploaded" className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center max-w-150px" />
              </div>
            ):(
              <p className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center">No image preview available</p>
            )}
            {result && result.crowdDensity ? (
              <img src={`http://172.172.166.26:8000${result.crowdDensity}`} alt="Crowd Density" className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center max-w-150px" />
            ) : (
              <p className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center">No crowd heatmap available</p>
            )}
          </div>
        </Card>
      </div>

      <div className="w-full md:w-1/3 p-5">
        
      <Card className="border-dashed border-2 p-5 mb-5 w-full h-full">
      {!result && !processing ? (
        <>
          <label className="text-blue-gray">Set Crowd Limit:</label>
          <div className="flex items-center">
            <Input type="number" value={threshold} onChange={handleThresholdChange} />
            <Button className="mx-2" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </>
      ) : (
        <Button className="mx-2 text-xs" onClick={handleTryAgain}>
          Try Again
        </Button>
      )}

   
      {result ? (
    
        <>    <CardHeader>
        <Typography content="Results" />
      </CardHeader>
      {message && (
          <div className={`relative text-center p-4 mt-10 rounded-lg ${blinkingClass} bg-white`} style={{ animation: `blinkShadow${result.crowdDensityFrequency} 1s linear infinite` }}>
            <p className="text-black py-1 px-4 rounded-lg">{message}</p>
          </div>
        )}

        <div className="col-span-1  p-4">
              <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                Crowd Limit: {threshold}
              </Typography>
              <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                Crowd Count: {result.estimatedCount}
              </Typography>
              <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                Crowd Status: {result.crowdStatus}
              </Typography>
              <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                Crowd Density Frequency: {result.crowdDensityFrequency}
              </Typography>
        </div>
        </>
      ):(
        <div className="col-span-1  p-4">
        <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
          Crowd Limit: 0
        </Typography>
        <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
          Crowd Count: 0
        </Typography>
        <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
          Crowd Status: 
        </Typography>
        <Typography className="border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
          Crowd Density Frequency: 
        </Typography>
  </div>
      )}
 
    </Card>

      </div>
    

    </div>
  );
};

export default CrowdDetection;
