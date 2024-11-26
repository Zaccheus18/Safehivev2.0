import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const PromptMessage = ({ crowdDensityFrequency, showPrompt, setShowPrompt }) => {
  const [message, setMessage] = useState("");
  const [blinkingClass, setBlinkingClass] = useState("");

  useEffect(() => {
    if (showPrompt) {
      switch (crowdDensityFrequency) {
        case "Low":
          setMessage("The Place is safe");
          setBlinkingClass("blink-green");
          break;
        case "Medium":
          setMessage("Need to be vigilant");
          setBlinkingClass("blink-yellow");
          break;
        case "High":
          setMessage("High Alert");
          setBlinkingClass("blink-red");
          break;
        default:
          setMessage("");
          setBlinkingClass("");
          break;
      }
    }
  }, [crowdDensityFrequency, showPrompt]);

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <div>
      {showPrompt && (
        <div className={`relative text-center p-4 rounded-lg ${blinkingClass} bg-white`} style={{ animation: `blinkShadow${crowdDensityFrequency} 1s linear infinite` }}>
          <button className="absolute top-0 right-0 text-xs font-bold" style={{ transform: "translate(50%, -50%)" }} onClick={handleClose}>X</button>
          <p className="text-black py-1 px-4 rounded-lg">{message}</p>
        </div>
      )}
    </div>
  );
};

PromptMessage.propTypes = {
  crowdDensityFrequency: PropTypes.string.isRequired,
  showPrompt: PropTypes.bool.isRequired,
  setShowPrompt: PropTypes.func.isRequired,
};

export default PromptMessage;
