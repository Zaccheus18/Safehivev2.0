import React, { useRef } from "react";
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
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('Safehive-contact', 'template_82ah3iy', e.target, 'Y5LLtGCrDaetqqYBj7')
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        // Add any success message or redirection here if needed
      }, (error) => {
        console.error('Email sending failed:', error);
        // Handle errors or display error messages here
      });

    // Clear the form fields after sending the email
    e.target.reset();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between" style={{ minHeight: "680px" }}>
      <CardBody className="px-4 py-8 mt-2 mb-10 lg:flex lg:items-center lg:w-1/2">
        <div className="w-full lg:pr-4">
          <form onSubmit={sendEmail}>
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
              <Typography className="text-4xl font-bold mb-5 mt-20 lg:mt-0">Contact Us</Typography>
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  name="from_name"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  name="reply_to"
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  required
                  name="message"
                />
              </div>
              <Button
                color="blue"
                ripple={true}
                className="btn-sm"
                type="submit"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </CardBody>
      <div className="lg:w-1/2 lg:pl-4 flex justify-center items-center">
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