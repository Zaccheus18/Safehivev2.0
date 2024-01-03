import React, { useEffect, useState } from "react";
import { EnvelopeIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import '../../../public/css/tailwind.css';
export function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const headerstyle = {
    fontFamily: 'fraunces',
    fontSize: '32px', // Change this value to the desired font size
  };
  const paragraphstyle = {
    fontFamily: 'Poppins',
    fontSize: '18px',
  };
  return (
    <div className="px-4 py-10 mt-20 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Typography style={headerstyle} className="text-2xl font-semibold">Stay Connected</Typography>
          <Typography style={paragraphstyle}  className="text-base mt-2">
            Follow us on social media for updates and news.
          </Typography>
          <div style={paragraphstyle} className="mt-4 flex flex-wrap">
            <a
              href="https://www.facebook.com/safehive.live"
              className="mr-3 mb-2 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/_SafeHive"
              className="mr-3 mb-2 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/frenchiechua"
              className="mb-2 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="custom-md-ml">
          <Typography style={headerstyle} className="text-2xl font-semibold mt-6 md:mt-0">Contact Us</Typography>
          <Typography style={paragraphstyle}  className="text-base mt-2">
            Have questions or need support? Contact us.
          </Typography>
          <div className="mt-4">
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-black mr-2" />
              <Typography style={paragraphstyle} >Email: safehive.live_01@gmail.com</Typography>
            </div>
            <div className="flex items-center mt-2">
              <DevicePhoneMobileIcon className="h-5 w-5 text-black mr-2" />
              <Typography style={paragraphstyle} >Phone: (+63) 915 833 4188</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <Typography style={paragraphstyle} className="text-base" >&copy; {new Date().getFullYear()} Safehive Team. All rights reserved.</Typography>
      </div>
    </div>
  );
}


export default Footer;
