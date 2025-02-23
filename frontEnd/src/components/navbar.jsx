import React from "react";

const navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-#000000 bg-opacity-80 text-white z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-left text-2xl font-bold">soundRanked</h1>
        <ul className="flex gap-x-6 items-center">
          <li>
            <a href="#">
              <img src="./homeIcon.svg" alt="home" className="w-6.5 h-6.5" />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="./rankingsIcon.svg"
                alt="rankings"
                className="w-6 h-6"
              />
            </a>
          </li>
          <li>
            <a href="#"></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
