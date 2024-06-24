// routes.js
import React from "react";
import { Route } from "react-router-dom";

import Home from "@/pages/dashboard/Home";
import Program from "@/pages/dashboard/Program";
import About from "@/pages/dashboard/About";
import Contact from "@/pages/dashboard/Contact";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/program",
    component: Program,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contact",
    component: Contact,
  },
];

export default routes;
