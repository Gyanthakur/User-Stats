import React, { useState } from "react";
import {
  FacebookLogo,
  TwitterLogo,
  WhatsappLogo,
  LinkedinLogo,
  GithubLogo,
  ArrowUp,
  ArrowDown,
} from "phosphor-react";

const Footer = () => {
  const [scrollToTop, setScrollToTop] = useState(true);

  const handleScroll = () => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    setScrollToTop(!scrollToTop);
  };

  return (
    <footer className=" mt-5 bg-green-600 bottom-0 text-white text-center py-6">
      <div>
        <p className="text-sm">
          © {new Date().getFullYear()} GitHub Tracker. All Rights Reserved.
        </p>
      </div>
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="https://www.facebook.com/profile.php?id=100026766931684"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-white"
        >
          <FacebookLogo size={24} />
        </a>
        <a
          href="https://x.com/gps_96169"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-white"
        >
          <TwitterLogo size={24} />
        </a>
        <a
          href="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-white"
        >
          <WhatsappLogo size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/gyan-pratap-singh-275785236/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-white"
        >
          <LinkedinLogo size={24} />
        </a>
        <a
          href="https://github.com/Gyanthakur"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-white"
        >
          <GithubLogo size={24} />
        </a>
      </div>
      {/* Scroll Button */}
      <button
        onClick={handleScroll}
        className="fixed bottom-16 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110"
        title={scrollToTop ? "Go to Top" : "Go to Bottom"}
      >
        {scrollToTop ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
      </button>
    </footer>
  );
};

export default Footer;
