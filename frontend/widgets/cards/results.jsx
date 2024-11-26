import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

const Results = ({ file }) => {
  return (
    <ul>
      {file ? (
        <div>
          <div className="border border-blue-gray-200 p-4 mb-4 mt-5 rounded-lg">
            <Typography className="text-blue-gray">
              Name: {file.name}
            </Typography>
          </div>
          <div className="border border-blue-gray-200 p-4 mb-4 rounded-lg">
            <Typography className="text-blue-gray">
              Size: {file.size} bytes
            </Typography>
          </div>
          <div className="border border-blue-gray-200 p-4 mb-4 rounded-lg">
            <Typography className="text-blue-gray">
              Type: {file.type}
            </Typography>
          </div>
        </div>
      ) : (
        <Typography className="text-blue-gray">No file selected.</Typography>
      )}
    </ul>
  );
};

Results.propTypes = {
  file: PropTypes.object,
};

export default Results;
