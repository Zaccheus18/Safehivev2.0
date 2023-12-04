import React from "react";
import PropTypes from "prop-types";

const LoadingOverlay = ({ loading }) => {
  return loading ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700 bg-opacity-50 text-white">
      <div className="text-center">
        <p>Your Image is Processing. Please wait a moment...</p>
        <div className="animate-spin text-2xl mt-4">Loading...</div>
      </div>
    </div>
  ) : null;
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingOverlay;
