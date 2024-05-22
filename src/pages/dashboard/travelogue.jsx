import React from 'react';


export const Travelogue = () => {

    return (
        <div className="container mx-auto px-10 py-20">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Virtual Tour Video</h2>
            <div className="aspect-w-16 aspect-h-9">
              {/* Add your virtual tour video component here */}
              <iframe
                title="Virtual Tour Video"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameBorder="0"
                allowFullScreen
                className="w-full h-96"
              ></iframe>
            </div>
          </section>
    
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">The Journey</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque lectus sed massa tincidunt, vel viverra justo ultrices. Donec nec ultricies ipsum. Sed sollicitudin nisi a lacus ultricies, vitae dictum ex tristique.
            </p>
            {/* Add more details about the journey */}
          </section>
    
          <section>
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque lectus sed massa tincidunt, vel viverra justo ultrices. Donec nec ultricies ipsum. Sed sollicitudin nisi a lacus ultricies, vitae dictum ex tristique.
            </p>
            {/* Add more details about the experience */}
          </section>
        </div>
      );
}

export default Travelogue;
