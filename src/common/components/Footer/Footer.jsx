import React from "react";
import "./Footer.css";

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div id="footer">
      Copright ©{" "}
      <a href="https://github.com/dhirajdalvi2001">dhirajdalvi2001</a> {year}
    </div>
  );
};
