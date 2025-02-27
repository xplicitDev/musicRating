import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-opacity-15 flex justify-between items-center h-24 px-15 text-white z-30">
      <h1 className="text-2xl font-bold text-white">soundRanked</h1>
      <ul className="hidden md:flex">
        <li className="p-4">Home</li>
        <li className="p-4">Rankings</li>
        <li className="p-4">Favorites</li>
        <li className="p-4">Community</li>
      </ul>
      <div onClick={handleNav} className="block md:hidden z-30">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="text-3xl font-bold text-white m-4">soundRanked</h1>
        <li className="p-4 border-b border-gray-600">Home</li>
        <li className="p-4 border-b border-gray-600">Rankings</li>
        <li className="p-4 border-b border-gray-600">Favorites</li>
        <li className="p-4">Community</li>
      </ul>
    </div>
  );
};

export default navbar;
