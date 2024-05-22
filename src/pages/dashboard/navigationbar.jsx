import React from 'react';
import { Avatar, Typography } from "@material-tailwind/react";

// Component for the navigation bar
export const NavigationBar = ({ currentTime, handleNavigation }) => {
  // Function to navigate to a specific path
  const navigateTo = (path) => {
    handleNavigation(path);
  };

  return (
    <nav className={`sticky top-0 z-50 px-20 bg-opacity-70 bg-white backdrop-filter backdrop-blur-lg flex flex-col lg:flex-row justify-between `}>
      <div className="flex items-center ml-10">
        <button onClick={() => navigateTo('/home')} className="cursor-pointer w-50 mr-5">
          <Avatar
            color="lightBlue"
            size="lg"
            src="/img/Logo.png"
            alt="Logo"
            className='w-full h-20'
          />
        </button>
      </div>

      <ul className="flex items-center justify-between space-x-10 mr-20 font-bold">
        <li>
          {/* Home button */}
          <button onClick={() => navigateTo('/home')} className="text-black text-lg px-3 py-2 rounded-lg hover:bg-neutral-200 transition duration-300">
            Home
          </button>
        </li>
        <li>
          {/* About button */}
          <button onClick={() => navigateTo('/about')} className="text-black text-lg px-3 py-2 rounded-lg hover:bg-neutral-200 transition duration-300">
            About
          </button>
        </li>
        <li>
          {/* Contact button */}
          <button onClick={() => navigateTo('/contact')} className="text-black text-lg px-3 py-2 rounded-lg hover:bg-neutral-200 transition duration-300">
            Contact
          </button>
        </li>
        <li>
          {/* Travelogue button */}
          <button onClick={() => navigateTo('/travelogue')} className="text-black text-lg px-3 py-2 rounded-lg hover:bg-neutral-200 transition duration-300">
            Travelogue
          </button>
        </li>
        <li>
          {/* Inspired Works button */}
          <button onClick={() => navigateTo('/inspired-works')} className="text-black  text-lg px-3 py-2 rounded-lg hover:bg-neutral-200 transition duration-300">
            Inspired Works
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
