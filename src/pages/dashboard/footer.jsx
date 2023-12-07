import React, { useEffect, useState } from "react";
import { EnvelopeIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold">Stay Connected</h2>
          <p className="text-sm mt-2">
            Follow us on social media for updates and news.
          </p>
          <div className="mt-4 flex flex-wrap">
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
          <h2 className="text-2xl font-semibold mt-6 md:mt-0">Contact Us</h2>
          <p className="text-sm mt-2">
            Have questions or need support? Contact us.
          </p>
          <div className="mt-4">
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
              <p>Email: safehive.live_01@gmail.com</p>
            </div>
            <div className="flex items-center mt-2">
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-2" />
              <p>Phone: (+63) 915 833 4188</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <p>&copy; {new Date().getFullYear()} Safehive Team. All rights reserved.</p>
      </div>
    </div>
  );
}


export default Footer;
