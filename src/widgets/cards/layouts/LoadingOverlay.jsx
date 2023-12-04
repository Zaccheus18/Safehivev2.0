import React from "react";
import PropTypes from "prop-types";

const LoadingOverlay = ({ loading }) => {
  return loading ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50">
      <div className="text-center">
        
        <img src="../public/img/Loading.gif" alt="Loading" className="w-20 h-20 flex items-center" />
        <p className="mt-4">Your Image is Processing. Please wait a moment...</p>
      </div>
    </div>
  ) : null;
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingOverlay;
