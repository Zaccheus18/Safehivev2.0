import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Input, Button, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import LoadingOverlay from "./layouts/LoadingOverlay.jsx";
import PromptMessage from "./layouts/PromptMessage.jsx"; // Import the PromptMessage component
import "./layouts/style.css";

const getBorderStyle = (freq) => {
  let baseStyle = `mx-10 border-8`;

  if (freq === "Low") {
    return `${baseStyle} border-green-500 hazard-border-green`;
  } else if (freq === "Medium") {
    return `${baseStyle} border-yellow-500 hazard-border-yellow`;
  } else if (freq === "High") {
    return `${baseStyle} border-red-500 hazard-border-red`;
  }

  return ""; 
};

const DragDropFile = ({
  onChange,
  onSubmit,
  threshold,
  file,
  estimatedCount,
  crowdStatus,
  crowdDensityFrequency,
  crowdDensity,
}) => {
  const [heatmapUrl, setHeatmapUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false); // State to control the prompt

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    onChange(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onChange(selectedFile);
  };

  const handleThresholdChange = (event) => {
    const newThreshold = event.target.value;
    onSubmit(newThreshold);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("threshold", threshold);

      const response = await fetch("https://safehive-backend.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { estimatedCount, crowdStatus, crowdDensityFrequency, crowdDensity } = data;

        setHeatmapUrl(crowdDensity);
        onSubmit(threshold, estimatedCount, crowdStatus, crowdDensityFrequency);
        setShowBorder(true);
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeatmapUrl(crowdDensity);

    // Display the prompt based on crowd density frequency
    if (crowdDensityFrequency === "Low" || crowdDensityFrequency === "Medium" || crowdDensityFrequency === "High") {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [crowdDensity, crowdDensityFrequency]);


  
  return (
    <div className={`relative`}>

      <div className={`mb-5 mt-5 px-10 relative ${getBorderStyle(crowdDensityFrequency)}`}>
        <LoadingOverlay loading={loading} />

        <CardBody className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div
                    className={`border-2 border-blue-200 border-dashed p-4 rounded-lg mb-5 pb-10 pt-10 justify-center ${
                      showBorder ? "border-b-0" : ""
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleUploadClick}
                  >
                    {file ? (
                      <div>
                        <p>File Selected: {file.name}</p>
                      </div>
                    ) : (
                      <p>Drag and drop a file here or click to upload</p>
                    )}
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="my-3">
                  <PromptMessage crowdDensityFrequency={crowdDensityFrequency} showPrompt={showPrompt} setShowPrompt={setShowPrompt} />
                  </div>
                  <div className="border border-blue-gray-200 p-4  rounded-lg grid grid-cols-2 gap-4 flex items-center ">
                    {file && file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="border border-blue-gray-200 p-4 ml-4 mb-4 m-4 rounded-lg w-100 h-64 justify-center "
                        style={{ maxWidth: "300px" }}
                      />
                    ) : (
                      <p className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center">No image preview available</p>
                    )}
                    {heatmapUrl ? (
                      <img
                        src={heatmapUrl}
                        alt="Crowd Density Heatmap"
                        className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center"
                        style={{ maxWidth: "300px" }}
                      />
                    ) : (
                      <p className="border border-blue-gray-200 p-4 mb-4 mt-4 rounded-lg w-100 h-64 justify-center flex items-center">No crowd density heatmap available</p>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="border border-blue-gray-200 p-4 mb-4 rounded-lg">
                    <label className="text-blue-gray">Set Threshold:</label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="number"
                        placeholder="Enter Crowd Limit"
                        name="threshold"
                        value={threshold}
                        onChange={handleThresholdChange}
                        className={crowdDensityFrequency}
                      />
                      <Button type="submit" ripple={true} color="blue">
                        Submit
                      </Button>
                    </div>
                  </div>
                  {crowdDensity && (
                    <div className="col-span-1">
                      <Typography className="border border-blue-gray-200 p-4 mb-4 mt-5 rounded-lg">
                        Crowd Limit: {threshold}
                      </Typography>
                      <Typography className="border border-blue-gray-200 p-4 mb-4 mt-5 rounded-lg">
                        Crowd Count: {estimatedCount}
                      </Typography>
                      <Typography className="border border-blue-gray-200 p-4 mb-4 mt-5 rounded-lg">
                        Crowd Status: {crowdStatus}
                      </Typography>
                      <Typography className="border border-blue-gray-200 p-4 mb-4 mt-5 rounded-lg">
                        Crowd Density Frequency: {crowdDensityFrequency}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        </CardBody>
      
      </div>
    </div>
  );
};

DragDropFile.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  threshold: PropTypes.string.isRequired,
  file: PropTypes.object,
  estimatedCount: PropTypes.string.isRequired,
  crowdStatus: PropTypes.string.isRequired,
  crowdDensityFrequency: PropTypes.string.isRequired,
  crowdDensity: PropTypes.string,
};

export default DragDropFile;
