import React, { useState, useEffect } from 'react';
import { Home, About, Contact, NavigationBar, Footer } from '@/pages/dashboard';
import Favicon from 'react-favicon';

const App = () => {
  const [faviconUrl, setFaviconUrl] = useState('img/favicon.png'); // State for the favicon URL
  const [currentPage, setCurrentPage] = useState(window.location.pathname); // State for the current page
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); // State for current time

  useEffect(() => {
    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to handle navigation changes
  const handleNavigation = (path) => {
    setCurrentPage(path);
    // You can perform additional actions on navigation, like changing faviconUrl based on the page
    // For example: setFaviconUrl(getFaviconUrlForPage(path));
  };

  // Function to render different pages based on the current page state
  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return (
          <div className="bg-custom-blue md:px-8">
            <Home />
          </div>
        );
      case '/about':
        return (
          <div className="bg-custom-blue md:px-8">
            <About />
          </div>
        );
      case '/contact':
        return (
          <div className="bg-custom-blue md:px-8">
            <Contact />
          </div>
        );
      default:
        return (
          <div className="bg-custom-blue md:px-8">
            <Home />
          </div>
        );
    }
  };

  return (
    <div className="relative z-10">
      {/* Set favicon URL */}
      <Favicon url={faviconUrl} />
      {/* Render navigation bar */}
      <NavigationBar
        currentTime={currentTime}
        handleNavigation={handleNavigation}
      />

      {/* Render the current page */}
      {renderPage()}

      {/* Render footer */}
      <Footer />
    </div>
  );
};

export default App;
