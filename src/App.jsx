import React, { useState } from 'react';
import { Home, Program, About, Contact, NavigationBar, Footer } from '@/pages/dashboard';
import '../public/css/tailwind.css';
import Favicon from 'react-favicon';

const App = () => {
  const [faviconUrl, setFaviconUrl] = useState('img/favicon.png');

  return (
    <div className="relative z-10">
      <Favicon url={faviconUrl} />

      <div className="w-full text-black">
        <NavigationBar />

        <section id="home" className="section bg-custom-blue text-white md:px-8">
          <Home />
        </section>

        <section id="services" className="section1">
          <Program />
        </section>

        <section id="about" className="section2 bg-custom-blue text-white md:px-8">
          <About />
        </section>

        <section id="contact" className="section3">
          <Contact />
        </section>

        <section className="section4 bg-custom-blue text-white">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default App;
