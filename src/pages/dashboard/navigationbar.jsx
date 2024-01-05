import React from 'react';
import { Avatar, Typography } from "@material-tailwind/react";

// Component for the navigation bar
export const NavigationBar = ({ currentTime, handleNavigation }) => {
  // Function to navigate to a specific path
  const navigateTo = (path) => {
    handleNavigation(path);
  };

  return (
    // Navigation bar layout using flexbox
    <div className={`bg-color-white text-black p-4 pt-5 pb-5 flex flex-col lg:flex-row justify-between `}>
      {/* Logo and current time displayed */}
      <div className="flex items-center mb-4 lg:mb-0">
        <button onClick={() => navigateTo('/')} className="cursor-pointer w-350 mr-5">
          {/* Logo displayed as an Avatar */}
          <Avatar
            color="lightBlue"
            size="lg"
            src="/img/Logo.png"
            alt="Logo"
            className='w-full'
          />
        </button>
        {/* Current time displayed */}
        <Typography variant="h6" color="black" className="font-semibold font-sans lg:hidden">
          {currentTime}
        </Typography>
      </div>

      {/* List of navigation links for larger screens */}
      <ul className="flex lg:flex-row lg:items-center lg:gap-2 lg:mr-auto">
        <li>
          {/* Home button */}
          <button onClick={() => navigateTo('/')} className="mb-2 lg:mb-0 ml-3 font-semibold ">
            Home
          </button>
        </li>
        <li>
          {/* About button */}
          <button onClick={() => navigateTo('/about')} className="mb-2 lg:mb-0 ml-10 font-semibold ">
            About
          </button>
        </li>
        <li>
          {/* Contact button */}
          <button onClick={() => navigateTo('/contact')} className="mb-2 lg:mb-0 ml-10 font-semibold ">
            Contact
          </button>
        </li>
      </ul>

      {/* Current time displayed for larger screens */}
      <div className="hidden lg:flex items-center gap-2 text-lg font-bold">
        <Typography variant="h5" color="black" className="font-semibold font-sans">
          {currentTime}
        </Typography>
      </div>

      {/* List of navigation links for larger screens */}
      <ul className="hidden lg:flex-row lg:items-center gap-2">
        <li>
          {/* Home button */}
          <button onClick={() => navigateTo('/')} className="mb-2 lg:mb-0 mx-5 font-semibold ">
            Home
          </button>
        </li>
        <li>
          {/* About Us button */}
          <button onClick={() => navigateTo('/about')} className="mb-2 lg:mb-0 mx-5 font-semibold ">
            About Us
          </button>
        </li>
        <li>
          {/* Contact Us button */}
          <button onClick={() => navigateTo('/contact')} className="mb-2 lg:mb-0 mx-5 font-semibold ">
            Contact Us
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
