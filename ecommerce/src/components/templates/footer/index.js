import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-blue-500 font-semibold">E-Commerce</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
