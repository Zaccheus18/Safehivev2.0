import React from "react";
import PropTypes from "prop-types";
import '../../../../public/css/tailwind.css';

const LoadingOverlay = ({ loading }) => {
  return loading ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50">
      <div className="text-center relative">
        <img
          src="/img/Loading.gif"
          alt="Loading"
          className="size-img" // Adjust the width and height values
          
        />
        <p className="mt-4">Your Image is Processing. Please wait a moment...</p>
      </div>
    </div>
  ) : null;
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingOverlay;
