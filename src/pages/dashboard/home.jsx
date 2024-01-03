import React, { useState } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import {
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import { Program } from '@/pages/dashboard';

export function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const headerStyle = {
    fontFamily: 'fraunces',
  };

  const paragraphStyle = {
    fontFamily: 'Poppins',
  };

  return (
    <Router> {/* Ensure Router wraps the component */}
      <>
        <div className="mb-10 mt-5 relative flex flex-col md:flex-row justify-center items-center">
          <CardBody className="bg-opacity-0 my-10 relative z-10 md:w-full lg:w-1/2">
            <div className="md:flex md:items-center">
              <div className="md:w-full">
                <div className="ml-10 mr-5">
                  <Typography style={headerStyle} className="text-5xl font-bold mt-20">
                    SAFEHIVE
                  </Typography>
                  <Typography style={paragraphStyle} className="text-lg font-light mt-5 font-light">
                    SafeHive is an innovative solution designed to enhance crowd management strategies and ensure public safety at events. At its core is the Congested Scene Recognition Network (CSRNet), which accurately estimates crowd counts and generates high-quality density maps, even in densely populated areas. SafeHive provides valuable insights into crowd movement and distribution for event organizers and security personnel.
                  </Typography>
                  <div className="mt-5">
                    <Link to="/program"> {/* Use Link for navigation */}
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
          <div className="lg:w-1/2 lg:pl-4 flex justify-center items-center">
          <img
              src="img/home_img.png"
              alt="Image Description"
              className="h-auto lg:h-full w-full mt-12 z-0"
            />
          </div>
        </div>

        <Routes>
          <Route path="/program" element={<Program />} />
          {/* Define your routes within the Router */}
        </Routes>
      </>
    </Router>
  );
}



export default Home;
