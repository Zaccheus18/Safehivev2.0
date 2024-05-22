import React, { useState, useEffect, useRef } from "react";
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { About } from '@/pages/dashboard';

const Header = ({ openFullContent }) => (
  <header id="header" className="relative bg-cover bg-center" style={{ backgroundImage: "url('/img/header.png')" }}>
    <div className="absolute inset-0 opacity-50"></div>
    <div className="relative z-10 -mt-80 flex flex-col items-start text-white px-40 pb-80 pt-40">
      <h1 className="text-5xl font-bold mb-4 mt-80">History of Olotayan</h1>
      <p className="mb-6 max-w-2xl text-xl text-justify">
        Olotayan Island, known for its pristine beaches and rich cultural history, has a unique story that dates back centuries. Discover the fascinating history of this hidden gem and how it has evolved over time.
      </p>
      <button className="text-white px-8 py-2 rounded-lg transition duration-300" onClick={openFullContent}>
        Learn More
      </button>
    </div>
  </header>
);

const Variations = () => {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/2.png';
    img.onload = () => {
      if (containerRef.current) {
        setBgImageHeight(img.height);
      }
    };
  }, [containerRef.current]);
  
  const openFullContent = () => setShowFullContent(true);
  const closeModal = () => setShowFullContent(false);

  const images = [
    '/img/image.jpg',
    '/img/image.jpg',
    '/img/image.jpg',
    '/img/image.jpg',
    '/img/image.jpg',
    '/img/image.jpg',
  ];


  const variations = [
    {
      id: 1,
      title: 'Version 1',
      description: `Noong unang panahon may isang napakagandang dilag na ang pangalan ay si Agutaya. Dahil sa nakabibighani niyang kariktan ang pihikang puso ng binatang si Higante ang pangalan ay...`,
      fullContent: `Noong unang panahon may isang napakagandang dilag na ang pangalan ay si Agutaya. Dahil sa nakabibighani niyang kariktan ang pihikang puso ng binatang si Higante ang pangalan ay nabihag. Sinimulang suyuin ng binatang ito si Agutaya. Lumipas ang ilang araw na pagsusuyo ng inilahad sa dalaga, ito ay nahalinhan ng sapagkat hindi niya napilit ang sarili na kalugdan ang nagsusumamong binata.
      Isang araw, nang si Higante ay pumasyal upang suyuin ang pinakamimithing binibini, hindi na matimpi ng dalaga ang malaon na pagkamuhi sa binata, kaya buong lakas na inihagis sa binata ang dalawang sapatos nito. Ang binata ay tumakbo ng malayung-malayo upang huwag tamaan ng inihagis sa kanya.
      Pagkalipas ng mahabang panahon, ang binatang Higante noon ay naging Isle de Higante ngayon. Isang islang sakop ng probinsya ng Iloilo. Ang dalawang paa ng Higante ay hindi pareho ang laki. Ang sapatos na noon ay ihinagis ay naging sapatos diutay na ibig sabihin sa tagalog ay (maliit) at sapatos daki na ang kahulugan ay malaki. Ang dalawang sapatos na ito ay naging isla ngayon ng sapatos diutay at sapatos daku. Ang sapatos diutay ay sakop ng Panay at ang sapatos daku naman ay sakop ng probinsiya ng Masbate.
      Si Agutaya ay naging isla ngayon at siyang tinatawag na Olotayan (sa kalaunan). Olotayan ang tawag sapagkat noon ang islang ito ay hindi buo. Mayroong ilog sa gitna ng dalawang hanay na mga bundok. Itong ilog sa gitna ay tinatawag na “ulot” sa salitang Bisaya na ang ibig sabihin sa Tagalog ay pagitan. Noon ang mga tao ay gumagamit ng bangka pag sila’y tumatawid sa kabilang sitio, na ngayon ay sitio Sawang. Ang sitio Capaculan at sitio Lo-oc ay magkadikit din. Ang pagitan nila ay bundok.
      Taon 1912, bumagyo ng  kay lakas-lakas na kung tawagin ay “Bagyo Ugis”, salitang Bisaya na ang ibig sabihin ay simot, walang natira, at ito ang naging dahilan na ang mga bihangin at mga bato at kung ano-ano pang mga kahoy ay sumampa sa tabi lalong-lalo na sa ilog na naging “ulot” o pagitan sa dalawang magkatabing sitio.
      Ang Olotayan noong panahon ng digmaang Kastila ay may matirik na bundok na siyang nilagyan ng bandila, dahil ito ang pinakamataas na bundok ng Olotayan. Makikita rin ang nilagay na kanyon sa isang bundok na ngayon ay tinatawag na sementeryo ng mga mamamayan. Ang Olotayan ay may limang kiloentronglayo sa kabayanan. May apat na pung limang (45) minutos na biyahe sa bangkang de motor.
      Ang kabuhayan ng mga tao ay pangingisda lamang. Ang isda ay siyang pangunahing produkto ng lugar na ito.`,
      image: images[0],
    },
    {
      id: 2,
      title: 'Version 2',
      description: `Once upon a time, there was a beautiful maiden named Agutaya. Enchanted by her beauty, the giant fell in love with the maiden and...`,
      fullContent: `Once upon a time, there was a beautiful maiden named Agutaya. Enchanted by her beauty, the giant fell in love with the maiden and courted her. However, the beautiful Agutaya rejected the giant which made him angry. So he threw his shoes and his socks which both became islands. Since the giant had unequal feel sizes, his small shoe became the Sapatos Gamay island while the big shoe became the Sapatos Dako island. On the other hand, his socks became the Sapatilyo island. For a while, the island was once called Agutaya and later became the Olotayan* Island after the gap on the island vanished.`,
      image: images[1],
    },
    {
      id: 3,
      title: 'Version 3',
      description: `The princess of Isla Gigantes was a very beautiful maiden who caught the heart of the giant named...`,
      fullContent: `The princess of Isla Gigantes was a very beautiful maiden who caught the heart of the giant named Olo. Olo tried to court the princess but was unable to acquire her affection. The princess refused the giant’s advances. Stung by rejection, Olo got mad. He kicked off his shoes. His small shoe became an island now called Sapatos Diutay, and his large shoe became what is now known as Sapatos Daku. The difference between the sizes of his shoes is due to the fact that his feet are of unequal sizes. In his rage, he also threw his toothbrush which became the island called Sapatilyo. Later on, it was said that the giant Olo’s head (ulo) and stomach (tiyan) are what now constitute the island of Olotayan.`,
      image: images[2],
    },
    {
      id: 4,
      title: 'Version 4',
      description: `It was once said that the island of Agotayan was once divided by a gap. In the island lived a beautiful princess of the same ...`,
      fullContent: `It was once said that the island of Agotayan was once divided by a gap. In the island lived a beautiful princess of the same name. A dark-skinned giant prince named Higante had fallen in love with the princess Agotayan and pursued her for many years. When they were young, the princess rejected Higante. He got angry and threw his shoe into the sea. Years passed and both the Agotayan and Higante have grown. However, their feelings towards each other remained the same. Higante is still trying to court the princess and earn her affection. Yet, the Agotayan is still adamant in her refusal of the giant prince’s intentions. Wounded by Agotayan’s rejection, Higante flew into a rage once again. This time he threw his shoe, his hat, and his toothbrush. This belongings that he flung into the sea became islands later on. The shoe he threw when he was younger became the island Sapatos Diutay while the one he threw when he has grown is now known as Sapatos Daku. His hat became the island Manigo-nigo, and his toothbrush is now Sapatilyo island. Through her life, it was known that Agotayan never married, not the giant nor any other beings. Later on, Higante turned into the well-known tourist destination of Islas de Gigantes in the province of Iloilo. Meanwhile, Agotayan became the island that is now referred to as Olotayan island.`,
      image: images[3],
    },
    {
      id: 5,
      title: 'Version 5',
      description: `The giant saw a beautiful maiden named Agutaya and was instantly captivated by her...`,
      fullContent: `The giant saw a beautiful maiden named Agutaya and was instantly captivated by her beauty. He fell in love with the maiden and tried to pursue her hand in marriage. However, Agutaya rejected his intentions which resulted into a heated argument. In a burst of emotion, the giant threw his shoe into which became an island. His fit of rage scared the people, leading them to turn to their deities for help. Hearing the people’s pleas, their god smote the giant with lightning. The giant’s body broke into pieces, turned into stone, and became an island.`,
      image: images[4],
    },
    {
      id: 6,
      title: 'Version 6',
      description: `A long time ago, on a small island, the people feared a giant who would wreak havoc and...`,
      fullContent: `A long time ago, on a small island, the people feared a giant who would wreak havoc and terrorize those who inhabited the place. The people started praying to their gods to ask for protection from the aggressive giant and their god heard their pleas. The deities struck down the wicked giant with lightning and the giant’s body was broken into pieces, plummeting into the sea. These body parts then turned into islands. The eyes and the ears became the Mantalinga island, his feet became the Sapatos island, his buttocks became the Tuwad island, and the giant’s head and stomach became the Olotayan island.`,
      image: images[5],
    },
];
return (
  <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('/img/header2.jpg')" }}>
    <div className="container mx-auto px-10 py-20">
    <h2 className="text-4xl font-bold mb-20 text-center text-white">VARIATIONS</h2>
        <div className="relative">
          {variations.map((variation, index) => (
            <div key={variation.id} className={`relative text-justify flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-12`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`md:w-1/2 p-4 bg-white rounded-lg shadow-md relative z-2 transform ${index % 2 === 0 ? '-rotate-6' : 'rotate-6'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={variation.image} alt={variation.title} className="w-full h-full object-cover rounded-lg shadow-md" />
                <h3 className="text-2xl font-semibold my-4">{variation.title}</h3>
                <p>{variation.description}</p>
                <button
                  onClick={() => {
                    setSelectedVariation(variation);
                    setShowFullContent(false); // Close the full content modal if open
                  }}
                  className="mt-4 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Read More
                </button>
              </div>
              <div className="rounded-full z-20"></div>
            </div>
          ))}
        </div>

        {showFullContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  ">
            <div className="bg-white rounded-lg shadow-lg w-4/5 md:w-2/3 lg:w-1/2 h-2/3 overflow-y-auto p-6 relative" style={{ transition: 'opacity 0.3s' }}>
              <button onClick={closeModal} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-700 transition duration-300">
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedVariation.title}</h2>
              <img src={selectedVariation.image} alt={selectedVariation.title} className="w-full h-auto rounded-lg mb-4" />
              <p className="mb-4 text-justify">{selectedVariation.fullContent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export function Home() {
  return (
    <Router>
      <>
        <Header openFullContent={() => setShowFullContent(true)} /> {/* Pass the function to open full content */}
        <Variations />
      </>
      <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  );
}

export default Home;
