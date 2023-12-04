import React, { useState } from "react";
import axios from 'axios';
import DragDropFile from "@/widgets/cards/draganddrop";

export function Program() {
  const [file, setFile] = useState(null);
  const [threshold, setThreshold] = useState("");
  const [estimatedCount, setEstimatedCount] = useState("");
  const [crowdStatus, setCrowdStatus] = useState("");
  const [crowdDensityFrequency, setCrowdDensityFrequency] = useState("");
  const [crowdDensity, setCrowdDensity] = useState("");

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleThresholdSubmit = async (newThreshold) => {
    setThreshold(newThreshold);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("threshold", newThreshold);
  
    try {
      const response = await axios.post("https://safehive-backend.onrender.com/predict", formData);
  
      if (response.status === 200) {
        const result = response.data;
        setEstimatedCount(result.estimatedCount);
        setCrowdStatus(result.crowdStatus);
        setCrowdDensityFrequency(result.crowdDensityFrequency);
        setCrowdDensity(result.crowdDensity);
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <DragDropFile
        onChange={handleFileChange}
        onSubmit={handleThresholdSubmit}
        threshold={threshold}
        file={file}
        estimatedCount={estimatedCount}
        crowdStatus={crowdStatus}
        crowdDensityFrequency={crowdDensityFrequency}
        crowdDensity={crowdDensity}
      />
    </div>
  );
}

export default Program;
