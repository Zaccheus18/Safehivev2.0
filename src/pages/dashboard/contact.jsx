import React, { useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export function Contact() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const sendEmail = () => {
    const recipient = 'frenchie.chua@wvsu.edu.ph';
    const subject = 'Message from Contact Form';
    const body = `Name: ${nameRef.current.value}\nEmail: ${emailRef.current.value}\nMessage: ${messageRef.current.value}`;
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex items-center justify-center" style={{ height: "680px" }}>
      <CardBody className="px-4 py-8 mt-2 mb-10 px-10 lg:flex lg:items-center">
        <form className="w-full ml-20 lg:w-1/2 pr-4">
          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
            <Typography className="text-4xl font-bold mb-5 mt-20">Contact Us</Typography>
            <div>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                inputref={nameRef}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                required
                inputref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <Textarea
                id="message"
                placeholder="Your Message"
                required
                inputref={messageRef}
              />
            </div>
            <Button
              color="blue"
              ripple={true}
              className="btn-sm"
              onClick={sendEmail}
            >
              Send Message
            </Button>
          </div>
        </form>
        <div className="lg:w-1/2 pl-4 flex justify-center items-center">
          <img
            src="/img/contact.png"
            alt="Contact Us Image"
            className="w-1/2"
            style={{ width: "60%" }}
          />
        </div>
      </CardBody>
    </div>
  );
}

export default Contact;
