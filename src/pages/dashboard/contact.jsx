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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('Safehive-contact', 'template_82ah3iy', e.target, 'c7MeqpMCl5TH4iu46')
      .then((result) => {
        console.log(result.text);

      }, (error) => {
        console.log(error.text);
      });
  }

  const resetForm = () => {
    if (formRef && formRef.current) {
      formRef.current.reset(); // Reset the form fields
    }
  }

  return (
    <div className="flex flex-col  mx-20 lg:flex-row lg:items-center justify-center lg:justify-between">
      <CardBody className="px-4 py-8 mt-4  mb-10 lg:flex lg:items-center lg:w-1/2">
        <div className="w-full lg:pr-4">
          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
          <Typography className="text-4xl font-bold mb-5 mt-10 flex whitespace-nowrap">Contact Us!</Typography>

            <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
              <label>Name</label>
              <Input type="text" name="from_name" />
              <label>Email</label>
              <Input type="email" name="user_email" />
              <label>Subject</label>
              <Input type="text" name="subject" />
              <label>Message</label>
              <Textarea name="message" />
              <Button type="submit" value="Send">Send Email</Button>
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
