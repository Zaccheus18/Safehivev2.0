import React, { useRef } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
} from "@material-tailwind/react";

export function Home() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <CardBody className="bg-opacity-0">
          <div className="md:flex md:items-center">
            <div className="md:w-full lg:w-1/2">
              <div className="ml-10 mr-5">
                <Typography className="text-4xl font-bold">
                  SAFEHIVE
                </Typography>
                <Typography className="text-base font-light mt-5 font-light">
                SafeHive is an innovative solution designed to enhance crowd management strategies and ensure public safety at events. At its core is the Congested Scene Recognition Network (CSRNet), which accurately estimates crowd counts and generates high-quality density maps, even in densely populated areas. SafeHive provides valuable insights into crowd movement and distribution for event organizers and security personnel.
                </Typography>
                <div className="mt-5">
                  <Button
                    onClick={() => scrollToSection("about")}
                    color="blue"
                    size="md"
                  >
                    About Us
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:w-full lg:w-1/2">
              <img
                src="img/home_img.png"
                alt="Image Description"
                className="h-auto lg:h-full w-full object-cover"
              />
            </div>
          </div>
        </CardBody>
      </div>
    </>
  );
}

export default Home;
