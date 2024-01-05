// Importing necessary dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Input, Button, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { CameraIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingOverlay from "./layouts/LoadingOverlay.jsx";
import "./layouts/style.css";

// Component for Crowd Detection
const CrowdDetection = ({ onClose }) => {
  // State variables using useState hook
  const [file, setFile] = useState(null);
  const [threshold, setThreshold] = useState(0);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()


// Styling for the popup container
const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#fff",
  zIndex: 9999,
  justifyContent: "center",
  alignItems: "center",
  overflowY: "auto",   // Vertical overflow with scrollbar when necessary
};

// Styling for the content inside the popup
const contentStyle = {
  maxWidth: "100%",
  backgroundColor: "#fff",
  borderRadius: "8px",
  position: "relative",
};

// Function to determine CSS class for border blinking based on frequency
const getBorderStyle = (freq) => {
  let blinkingClass = '';

  if (freq === "Low") {
    blinkingClass = "blink-green";
  } else if (freq === "Medium") {
    blinkingClass = "blink-yellow";
  } else if (freq === "High") {
    blinkingClass = "blink-red";
  }

  return { blinkingClass }; 
};

// Function to get message and blinking class based on frequency
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

  // Extracting message and blinkingClass based on crowdDensityFrequency
const { message, blinkingClass } = getMessageAndClass(result?.crowdDensityFrequency || '');

// Event handler for file change
const handleFileChange = (event) => {
  const uploadedFile = event.target.files[0];
  setFile(uploadedFile);
};

// Event handler for threshold change
const handleThresholdChange = (event) => {
  setThreshold(event.target.value);
};

// Event handler for drop
const handleDrop = (event) => {
  event.preventDefault();
  const uploadedFile = event.dataTransfer.files[0];
  setFile(uploadedFile);
};

// Event handler for drag over
const handleDragOver = (event) => {
  event.preventDefault();
};

// Event handler for upload click
const handleUploadClick = () => {
  document.getElementById('fileInput').click();
};

// Event handler for form submission
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

// Event handler to reset values
const handleTryAgain = () => {
  setFile(null);
  setThreshold(0);
  setResult(null);
  setError(null);
};

// Function to open the popup
const openPopup = () => {
  setShowPopup(true);
};

// Function to close the popup
const closePopup = () => {
  setShowPopup(false);
};

// Styles for header and paragraph
const headerStyle = {
  fontFamily: 'fraunces',
};

const paragraphstyle = {
  fontFamily: 'Poppins',
};

return (
  // Rendered JSX structure
  <div style={popupStyle}>
    <div style={contentStyle}>
      {/* Container with custom blue background */}
      <div className='bg-custom-blue py-14 w-full -my-11'>
        {/* Button to navigate back */}
        <div className="flex justify-start">
          <Button onClick={() => navigate("/")} className='bg-white text-black rounded-full -mt-2 -mb-5 ml-5 z-10'>
            <ArrowLeftIcon className="h-5 w-5 my-1 -mx-1" />
          </Button>
        </div>
        <div className="flex flex-col md:flex-row items-stretch my-5 ">
          {/* Section for file upload */}
          <div className="w-full md:w-2/3 p-5">
            <LoadingOverlay loading={loading} />
            <Card className="border-dashed border-2 p-5 mb-5 w-full ">
              {/* Drop zone for uploading files */}
              <div
                className="h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleUploadClick}
              >
                {/* Input for file selection */}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
                <CameraIcon className="h-10 w-10 mb-2 text-indigo-500" />
                <Typography style={paragraphstyle} color="indigo" className="text-lg">Drag and drop or click to upload</Typography>
              </div>
              <br />
              {/* Display uploaded image or placeholder */}
              <div className='border border-blue-gray-200 p-4 rounded-lg grid grid-cols-2 gap-4 flex items-center'>
                {file ? (
                  <div>
                    <img src={URL.createObjectURL(file)} alt="Uploaded" className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center max-w-150px" />
                  </div>
                ) : (
                  <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center">No image preview available</Typography>
                )}
                {/* Display crowd density heatmap or placeholder */}
                {result && result.crowdDensity ? (
                  <img src={`http://172.172.166.26:8000${result.crowdDensity}`} alt="Crowd Density" className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center max-w-150px" />
                ) : (
                  <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center">No crowd heatmap available</Typography>
                )}
              </div>
            </Card>
          </div>
          {/* Section for setting crowd limit */}
          <div className="w-full md:w-1/3 p-5">
            <Card style={paragraphstyle} className="border-dashed border-2 p-5 w-full h-85%">
              {!result && !processing ? (
                // Form to set crowd limit and submit
                <>
                  <label className="text-lg text-blue-gray">Set Crowd Limit:</label>
                  <div className="flex items-center">
                    <Input type="number" value={threshold} onChange={handleThresholdChange} />
                    <Button className="text-xs mx-2 bg-blue-900" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </>
              ) : (
                // Button to try again
                <Button className="mx-2 text-xs bg-blue-900" onClick={handleTryAgain}>
                  Try Again
                </Button>
              )}
              
   
          {result ? (
            // Render if there's a result
            <>  
              <CardHeader>
                <Typography content="Results" />
              </CardHeader>
              {/* Display message if available */}
              {message && (
                <div className={`relative text-center p-4 mt-10 rounded-lg ${blinkingClass} bg-white`} style={{ animation: `blinkShadow${result.crowdDensityFrequency} 1s linear infinite` }}>
                  <Typography style={paragraphstyle}  className="text-lg text-black py-1 px-4 rounded-lg">{message}</Typography>
                </div>
              )}

              <div className="col-span-1 -mb-20 p-4">
                {/* Display various crowd-related information */}
                <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                  Crowd Limit: {threshold}
                </Typography>
                <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                  Crowd Count: {result.estimatedCount}
                </Typography>
                {/* Display crowd status with animation based on frequency */}
                <Typography style={{paragraphstyle, animation: `blinkShadow${result.crowdDensityFrequency} 1s linear infinite` }} className={`text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid ${blinkingClass}` } >
                  Crowd Status: {result.crowdStatus}
                </Typography>
                {/* Display crowd density frequency with animation based on frequency */}
                <Typography style={{paragraphstyle, animation: `blinkShadow${result.crowdDensityFrequency} 1s linear infinite` }} className={`text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid ${blinkingClass}` } >
                  Crowd Density Frequency: {result.crowdDensityFrequency}
                </Typography>
              </div>
            </>
          ) : (
            // Render if there's no result
            <div className="col-span-1  p-4">
              {/* Placeholder for no result */}
              <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                Crowd Limit: 0
              </Typography>
              <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                Crowd Count: 0
              </Typography>
              <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid ">
                Crowd Status: 
              </Typography>
              <Typography style={paragraphstyle} className="text-lg border border-blue-gray-200 py-4 px-4 mb-2 rounded-lg w-full border-solid">
                Crowd Density Frequency: 
              </Typography>
            </div>
          )}
          {/* Button to open popup */}
          <div className="flex justify-end">
            <Button onClick={openPopup} 
              rounded={true} 
              color="blue" 
              size="s" 
              className="mr-1 mt-20 text-md bg-blue-900 text-white rounded-full z-10"
            >
              ?
            </Button>
          </div>
    </Card>

    {showPopup && (
      // Display the popup if 'showPopup' state is true
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Popup content */}
        <div className="bg-white w-4/5 h-4/5  m-10  p-8 rounded-lg relative overflow-y-auto">
          <div className="flex justify-end">
            {/* Close button for the popup */}
            <Button onClick={closePopup} color="blue" size="sm" className="-mr-7 -mt-7 bg-blue-900 text-white rounded">
              X
            </Button>
          </div>
          {/* Popup content explaining functionality */}
          <Typography style={headerStyle} className="text-4xl font-bold mb-4">
            How does it work?
          </Typography>
          <Typography style={paragraphstyle}>
            {/* Explanation of crowd-related features */}
            On top of SafeHive’s crowd counting and density mapping capabilities, it also presents relevant crowd 
            features, such as a Crowd Limit, Crowd Status, and Crowd Density Frequency, where these factors serve 
            as further guides for crowd management procedures to mitigate potential risks and threats.
            Crowd Limit is the user input that serves as a threshold for determining a specified limit that a crowd must 
            follow. Crowd Status is the present assessment of a crowd’s behavior, while Crowd Density Frequency is 
            the level of density estimation of a crowd. Both Crowd Status and Crowd Density Frequency will be based 
            on the specified Crowd Limit of a user that aligns with their goal and purpose for an appropriate crowd 
            management approach. Additionally, there will be a corresponding color-coded notification for each level 
            of Crowd Density Frequency. To know more about these features, here is a visualization of how they 
            work:
          </Typography>
          {/* Image illustrating features */}
          <img
            src="img/HomePopUp.png"
            alt="Image Description"
            className="h-auto lg:h-auto w-auto mt-12 z-0"
          />
        </div>
      </div>
    )}

    </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default CrowdDetection;
