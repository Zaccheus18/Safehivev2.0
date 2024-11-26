import React from "react";
import { Particles } from "react-tsparticles";

export const Background = () => {
  const particlesInit = (main) => {
    main.particles.options = {
      number: {
        value: 80,
      },
      size: {
        value: 3,
      },
      links: {
        color: '#3498db',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
    };
  };
  
  
  

  const particlesLoaded = (container) => {
    // Particles are loaded and ready
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        // Global particles options
      }}
    />

  );
};

export default Background;
