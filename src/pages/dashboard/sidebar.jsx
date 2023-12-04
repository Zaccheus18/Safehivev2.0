import React, { useState, useEffect } from "react";
import { Typography, Avatar } from "@material-tailwind/react";

export function NavigationBar() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`bg-color-white text-black p-4 pt-5 pb-5 flex flex-col lg:flex-row justify-between `}>
      <div className="flex items-center mb-4 lg:mb-0">
        <Avatar
          color="lightBlue"
          size="lg"
          src="/img/Logo.png" 
          alt="Logo"
          className="cursor-pointer w-100 mr-5"
        />


        <Typography variant="h5" color="black" className="font-semibold font-sans lg:hidden">
          {currentTime}
        </Typography>
      </div>

      <ul className="flex lg:flex-row lg:items-center lg:gap-2 lg:mr-auto">
      <li>
        <a href="#home" onClick={(e) => scrollToSection(e, "home")} className="mb-2 lg:mb-0 ml-10 font-semibold text-md hover:underline">
          Home
        </a>
      </li>
      <li>
        <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="mb-2  ml-10  lg:mb-0 font-semibold text-md hover:underline">
          Program
        </a>
      </li>
      <li>
        <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="mb-2 lg:mb-0  ml-10  font-semibold text-md hover:underline">
          About
        </a>
      </li>
      <li>
        <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="mb-2 lg:mb-0   ml-10 font-semibold text-md hover:underline">
          Contact
        </a>
      </li>
    </ul>
  
      <div className="hidden lg:flex items-center gap-2 text-lg font-bold">
        <Typography variant="h5" color="black" className="font-semibold font-sans">
          {currentTime}
        </Typography>
        
      </div>
      <ul className="hidden lg:flex-row lg:items-center gap-2">
      <li>
          <a href="#home" onClick={(e) => scrollToSection(e, "home")} className="mb-2 lg:mb-0 mx-5 font-semibold text-md hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="mb-2 lg:mb-0 mx-5 font-semibold text-md hover:underline">
            Services
          </a>
        </li>
        <li>
          <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="mb-2 lg:mb-0 mx-5 font-semibold text-md hover:underline">
            About Us
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="mb-2 lg:mb-0 mx-5 font-semibold text-md hover:underline">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavigationBar;
