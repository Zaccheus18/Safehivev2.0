import React, { useState, useEffect } from 'react';
import { Home, About, Contact, NavigationBar, Footer } from '@/pages/dashboard';
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
    // You can perform additional actions on navigation, like changing faviconUrl based on the page
    // For example: setFaviconUrl(getFaviconUrlForPage(path));
  };

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
