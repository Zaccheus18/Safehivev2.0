import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import './public/css/tailwind.css';

const members = [
  {
    name: "Mathew Adriane Briones",
    position: "Back-end Developer",
    image: "/img/T1.png",
  },
  {
    name: "Frenchie Chua",
    position: "Front-end Developer",
    image: "/img/T2.jpg",
  },
  {
    name: "Samuel Jeth Datiles",
    position: "Project Manager",
    image: "/img/T3.jpeg",
  },
  {
    name: "Rhona Mae Taccad",
    position: "Researcher",
    image: "/img/T4.jpg",
  },
  {
    name: "Areane Samontan",
    position: "Researcher",
    image: "/img/T5.jpg",
  },
];


export function About() {
  return (
    <div className="my-10 px-4 lg:px-10">
      <CardBody className="p-6 pb-5 pt-1">
        <Typography className="text-4xl font-bold mb-5 mt-10 text-center">About Us</Typography>
        <div className="mb-8">
          <div className="ml-5 mr-5 mb-8">
            {/* Your paragraphs here */}
          </div>
        </div>

        <Typography className="text-2xl font-bold mb-10 mt-20 text-center">MEET THE TEAM</Typography>
        
        <div className="flex flex-wrap justify-center gap-4">
          {members.map((member, index) => (
            <Card key={index} className="w-48 sm:w-56 md:w-64">
              <CardHeader>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto my-2 rounded-full"
                />
              </CardHeader>
              <CardBody>
                <Typography className="text-base font-bold mb-1 text-center">{member.name}</Typography>
                <Typography className="text-sm font-light text-center">{member.position}</Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </CardBody>
    </div>
  );
}

export default About;