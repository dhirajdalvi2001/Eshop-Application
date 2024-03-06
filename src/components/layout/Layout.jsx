import React from "react";
import { Navbar } from "../../common/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout = () => {
  return (
    <div id="app">
      <Navbar />
      <div id="children">
        <Outlet />
      </div>
    </div>
  );
};
