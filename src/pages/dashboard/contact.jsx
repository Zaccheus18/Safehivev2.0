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
import '../../../public/css/tailwind.css';

export function Contact() {
  const formRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const headerstyle = {
    fontFamily: 'fraunces',
  };
  const paragraphstyle = {
    fontFamily: 'Poppins',
    fontWeight: 'bold', // Add fontWeight for bold text
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('Safehive-contact', 'template_82ah3iy', e.target, 'c7MeqpMCl5TH4iu46')
    .then(
      (result) => {
        alert('message sent successfully...');
        console.log(result.text);
        resetForm();
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  const resetForm = () => {
    if (formRef && formRef.current) {
      formRef.current.reset(); // Reset the form fields
    }
  }

  

  return (
    <div className="my-20 flex flex-col sm:px-8 md:px-16 lg:px-20 lg:flex-row lg:items-center justify-center lg:justify-between">
    <CardBody className=" px-4 py-20 mt-4 mb-10 lg:flex lg:items-center lg:w-1/2">
        <div className="w-full lg:pr-4 ">
          <div className="flex flex-col gap-2 bg-white bg-opacity-80 p-4 rounded-lg">
          <Typography style={headerstyle} className="text-5xl font-bold mb-5 mt-3  flex whitespace-nowrap">Contact Us!</Typography>

            <form ref={formRef} style={paragraphstyle} className="text-lg contact-form" onSubmit={sendEmail}>
              <label>Name</label>
              <Input className="bg-gray-100" type="text" name="from_name" />
              <label>Email</label>
              <Input className="bg-gray-100" type="email" name="user_email" />
              <label>Subject</label>
              <Input className="bg-gray-100" type="text" name="subject" />
              <label>Message</label>
              <Textarea className="bg-gray-100" name="message" />
              <Button type="submit" className="bg-blue-900 mt-5" value="Send"   >Send Email</Button>
            </form>
          </div>
        </div>
      </CardBody>

        <div className="lg:w-1/2 lg:pl-4 flex justify-center items-center hide">
          <img
            src="/img/contact.png"
            alt="Contact Us Image"
            className="w-1/2"
            style={{ width: "60%" }}
          />
        </div>
    </div>
  );
}

export default Contact;
