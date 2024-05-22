import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// Array of team members with their details
const members = [
  {
    name: "Full Name",
    position: "Back-end Developer",
    image: "/img/T1.png",
  },
  {
    name: "Full Name",
    position: "Front-end Developer",
    image: "/img/T2.jpg",
  },
  {
    name: "Full Name",
    position: "Project Manager",
    image: "/img/T3.jpeg",
  },
  {
    name: "Full Name",
    position: "Researcher",
    image: "/img/T4.jpg",
  },
  {
    name: "Full Name",
    position: "Researcher",
    image: "/img/T5.jpg",
  },
];

export function About() {
  return (
    <div className="relative bg-cover bg-center "  style={{ backgroundImage: "url('/img/2.png')" }}>
      <CardBody className="relative z-10 -mt-40 flex flex-col text-white px-40 pb-20 pt-60 mx-40">
        {/* Introduction section */}
        <h2 className="text-4xl font-bold mb-5 mt-20 text-center">RATIONALE</h2>
        <div className="mb-8">
          <div className="ml-5 mr-5 mb-8">
            <p className="text-xl font-light text-justify mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting, 
             remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
             sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
             Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        <h3 className="text-4xl font-bold mb-10 mt-20 text-center">AUTHORS</h3>
        
        <div className="flex flex-wrap justify-center">
          {/* Rendering team members */}
          {members.map((member, index) => (
            <div key={index} className={`w-64 p-2 m-3 ${index < 3 ? 'lg:w-1/4' : 'lg:w-1/4'}`}>
              <Card className="bg-white rounded-lg shadow-md">
                <CardHeader>
                  {/* Displaying member image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto my-2 rounded-full"
                  />
                </CardHeader>
                <CardBody>
                  {/* Member name and position */}
                  <h4 className="text-lg font-bold mb-1 text-center">
                    {member.name}
                  </h4>
                  <p className="text-base font-light text-center">
                    {member.position}
                  </p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>

        {/* Sponsors */}
        <h2 className="text-4xl font-bold mb-5 mt-20 text-center">SPONSORS</h2>
        <div className="mb-8">
          <div className="ml-5 mr-5 mb-8">
            <p className="text-xl font-light text-justify mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting, 
             remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
             sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
             Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        {/* Editor */}
        <h2 className="text-4xl font-bold mb-5 mt-20 text-center">EDITOR</h2>
        <div className="mb-8">
          <div className="ml-5 mr-5 mb-8">
            <p className="text-xl font-light text-justify mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting, 
             remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
             sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
             Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>


      </CardBody>
    </div>
  );
}

export default About;
