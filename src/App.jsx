import React, { useState, useEffect } from 'react';
import { Home, About, Contact, Travelogue, Inspired_works, NavigationBar, Footer } from '@/pages/dashboard';
import Favicon from 'react-favicon';

const App = () => {
  const [faviconUrl, setFaviconUrl] = useState('img/favicon.png');
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    setCurrentPage(path);
  };

  const renderPage = () => {
    switch (currentPage) {
      case '/home':
        return (
          <div className="">
            <Home />
          </div>
        );
      case '/about':
        return (
          <div className="">
            <About />
          </div>
        );
      case '/contact':
        return (
          <div className="">
            <Contact />
          </div>
        );
        case '/travelogue':
          return (
            <div className="">
              <Travelogue />
            </div>
          );
        case '/inspired-works':
          return (
            <div className="">
              <Inspired_works />
            </div>
          );
      default:
        return (
          <div className="">
            <Home />
          </div>
        );
    }
  };

  return (
    <div className="relative z-10">
      <Favicon url={faviconUrl} />
      <NavigationBar
        currentTime={currentTime}
        handleNavigation={handleNavigation}
      />

      {renderPage()}

      <Footer />
    </div>
  );
};

export default App;
