import React from "react";

const navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-#000000 bg-opacity-80 text-white z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-left text-2xl font-bold">soundRanked</h1>
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <a href="#" className="hover:text-cyan-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400">
              Charts
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400">
              Discover
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
