import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} FinTrack — Track smart, spend better.</p>
    </footer>
  );
};

export default Footer;
