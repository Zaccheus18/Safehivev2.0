import React, { useState } from 'react';
import { Home, Program, About, Contact, NavigationBar, Footer, Background } from '@/pages/dashboard';
import '../public/css/tailwind.css';
import Favicon from 'react-favicon';

const App = () => {
  const [faviconUrl, setFaviconUrl] = useState('/img/favicon.png');

  return (
    <div className="relative z-10">
      <Favicon url={faviconUrl} />

      <div className="w-full text-black">
      <div className="flex flex-col min-h-screen">
     
   
      <NavigationBar />

    <section id="home" className="section bg-custom-blue text-white">
      <Home />
    </section>
    
    <section id="services" className="section">
      <Program />
    </section>
    
    <section id="about" className="section bg-custom-blue text-white">
      <About />
    </section>
    
    <section id="contact" className="section">
      <Contact />
    </section>
    
    
    <section className=" bg-custom-blue text-white">
    <Footer />
    </section>
  </div>
</div>

    </div>
  );
};

export default App;
