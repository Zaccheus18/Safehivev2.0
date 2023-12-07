import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";


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
          <Typography className="text-base font-light text-justify mb-4">
            At SafeHive, we are dedicated to revolutionizing crowd management and safety through 
            cutting-edge technology and innovative solutions. Our mission is to provide event organizers, 
            security personnel, and medical teams with a powerful deep learning-based crowd analysis system 
            that ensures efficient and effective management of large-scale events.
          </Typography>
          <Typography className="text-base font-light text-justify mb-4">
            Using state-of-the-art technology, particularly the Congested Scene Recognition 
            Network (CSRNet) model, SafeHive offers real-time crowd analysis, accurate crowd 
            counting, and high-quality density map generation.
          </Typography>
        </div>
        </div>

        <Typography className="text-2xl font-bold mb-10 mt-20 text-center">MEET THE TEAM</Typography>
        
        <div className="flex flex-wrap justify-center">
          {members.map((member, index) => (
            <div key={index} className={`w-64 p-2 m-3 ${index < 3 ? 'lg:w-1/4' : 'lg:w-1/4'}`}>
              <Card className="bg-white rounded-lg shadow-md">
                <CardHeader>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto my-2 rounded-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography className="text-base font-bold mb-1 text-center">
                    {member.name}
                  </Typography>
                  <Typography className="text-sm font-light text-center">
                    {member.position}
                  </Typography>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>


      </CardBody>
    </div>
  );
}

export default About;
