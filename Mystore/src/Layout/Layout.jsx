import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <br />
      <Footer />
    </>
  );
};

export default Layout;