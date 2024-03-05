import React from "react";
import { Navbar } from "../../common/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div id="app">
      <Navbar />
      <Outlet />
    </div>
  );
};
