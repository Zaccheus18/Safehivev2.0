// ParticleBackground.jsx

import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  const particlesOptions = {
    particles: {
      number: {
        value: 80,
      },
      size: {
        value: 3,
      },
      links: {
        color: '#02b0fa',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
    },
  };

  return (
    <Particles
      id="tsparticles"
      options={particlesOptions}
      style={{ position: 'absolute', zIndex: -1, width: '100%', height: '100vh' }}
    />
  );
};

export default ParticleBackground;
