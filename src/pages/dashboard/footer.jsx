import React, { useEffect, useState } from "react";
import '../../../public/css/tailwind.css';

export function Footer() {
    return (
      <footer className="bg-neutral-100 text-black py-6">
        <div className="container mx-auto px-10">
          <div className="flex justify-between items-center">
            <p className="text-sm">© 2024 OLOTAYAN. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
              <a href="#" className="hover:text-gray-300">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
