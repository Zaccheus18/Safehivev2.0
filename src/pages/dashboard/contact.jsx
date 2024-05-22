import React, { useRef, useState, useEffect } from "react";
import {
  CardBody,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import emailjs from '@emailjs/browser';

export function Contact() {
  const formRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // Function to send an email using emailjs
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('Safehive-contact', 'template_82ah3iy', e.target, 'c7MeqpMCl5TH4iu46')
    .then(
      (result) => {
        alert('Message sent successfully...');
        console.log(result.text);
        resetForm(); // Reset the form after sending the email
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  // Function to reset the form fields
  const resetForm = () => {
    if (formRef && formRef.current) {
      formRef.current.reset(); // Reset the form fields
    }
  }

  return (
    <div className="relative bg-cover bg-center "  style={{ backgroundImage: "url('/img/contact.png')" }}>

      <CardBody className="relative z-10 -mt-40 flex flex-col text-black px-20 pb-40 pt-80 mx-40 lg:w-1/2">
        <div className="w-full lg:pr-4">
          <div className="flex flex-col gap-2 bg-white bg-opacity-80 p-4 rounded-lg">
            <h3 className="text-5xl font-bold mb-5 mt-3  flex whitespace-nowrap">Contact Us!</h3>
            {/* Form for contacting */}
            <form ref={formRef}className="text-lg contact-form" onSubmit={sendEmail}>
              <label>Name</label>
              <Input className="bg-gray-100" type="text" name="from_name" />
              <label>Email</label>
              <Input className="bg-gray-100" type="email" name="user_email" />
              <label>Subject</label>
              <Input className="bg-gray-100" type="text" name="subject" />
              <label>Message</label>
              <Textarea className="bg-gray-100" name="message" />
              <button type="submit" className="bg-red-500 text-white mt-5" value="Send">Send Email</button>
            </form>
          </div>
        </div>
      </CardBody>

    </div>
  );
}

export default Contact;
