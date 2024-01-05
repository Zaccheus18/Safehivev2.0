import React from "react";
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import {
  Typography,
  CardBody,
  Button, // Import Button component
} from "@material-tailwind/react";
import { Program } from '@/pages/dashboard'; // Import the Program component

export function Home() {
  const headerStyle = {
    fontFamily: 'fraunces',
  };

  const paragraphStyle = {
    fontFamily: 'Poppins',
  };

  return (
    <Router> {/* Ensure Router wraps the component */}
      <>
        {/* Main content section */}
        <div className="mb-10 mt-5 relative flex flex-col md:flex-row justify-center items-center">
          <CardBody className="bg-opacity-0 my-10 relative z-10 md:w-full lg:w-1/2">
            <div className="md:flex md:items-center">
              <div className="md:w-full">
                <div className="ml-10 mr-5">
                  {/* Title */}
                  <Typography style={headerStyle} className="text-5xl font-bold mt-20">
                    SAFEHIVE
                  </Typography>
                  {/* Description */}
                  <Typography style={paragraphStyle} className="text-lg font-light mt-5 font-light">
                    SafeHive is an innovative solution designed to enhance crowd management strategies and ensure public safety at events. At its core is the Congested Scene Recognition Network (CSRNet), which accurately estimates crowd counts and generates high-quality density maps, even in densely populated areas. SafeHive provides valuable insights into crowd movement and distribution for event organizers and security personnel.
                  </Typography>
                  {/* Button to navigate to the CSRNet page */}
                  <div className="mt-5">
                    {/* Use the Link component to navigate to the Program component */}
                    <Link to="/program"> 
                      <Button 
                        color="blue"
                        size="lg"
                        className="bg-blue-900"
                      >
                        CSRNet
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          {/* Image section */}
          <div className="lg:w-1/2 lg:pl-4 flex justify-center items-center">
            <img
              src="img/home_img.png"
              alt="Image Description"
              className="h-auto lg:h-full w-full mt-12 z-0"
            />
          </div>
        </div>

        {/* Define routes */}
        <Routes>
          {/* Program component will be rendered on the "/program" route */}
          <Route path="/program" element={<Program />} />
        </Routes>
      </>
    </Router>
  );
}

export default Home;
