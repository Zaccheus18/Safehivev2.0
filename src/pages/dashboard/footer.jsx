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
    <div className="ml-20  p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Stay Connected</h2>
          <p className="text-sm mt-2">
            Follow us on social media for updates and news.
          </p>
          <div className="mt-4">
            <a
              href="#"
              className=" hover:text-blue-400 transition duration-300 ease-in-out mr-3"
            >
              Facebook
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition duration-300 ease-in-out mr-3"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="mr-20 mt-10">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-sm mt-2">
            Have questions or need support? Contact us.
          </p>
          <div className="mt-4">
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
              <p>Email: Safehive@gmail.com</p>
            </div>
            <div className="flex items-center mt-2">
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-2" />
              <p>Phone: (+63) 923-254-7890</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Safehive Team. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
