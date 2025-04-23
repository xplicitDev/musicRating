import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-none bg-opacity-50 backdrop-blur-md flex justify-between items-center h-16 px-6 text-white z-50 shadow-lg">
      <h1 className="text-2xl font-bold text-white">soundRanked</h1>
      <ul className="hidden md:flex">
        <li className="p-4 cursor-pointer hover:text-gray-400">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 cursor-pointer hover:text-gray-400">
          <Link to="/rankings">Rankings</Link>
        </li>
        <li className="p-4 cursor-pointer hover:text-gray-400">
          <Link to="/favorites">Favorites</Link>
        </li>
        <li className="p-4 cursor-pointer hover:text-gray-400">Community</li>
        <li className="p-4 cursor-pointer hover:text-gray-400">
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden z-50 cursor-pointer">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
      <ul
        className={`fixed top-0 w-[60%] h-full border-r border-gray-900 bg-black ease-in-out duration-500 z-40 ${
          nav ? "left-0" : "left-[-100%]"
        }`}
      >
        <h1 className="text-3xl font-bold text-white m-4">soundRanked</h1>
        <li className="p-4 border-b border-gray-600 cursor-pointer hover:text-gray-400">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 border-b border-gray-600 cursor-pointer hover:text-gray-400">
          <Link to="/rankings">Rankings</Link>
        </li>
        <li className="p-4 border-b border-gray-600 cursor-pointer hover:text-gray-400">
          <Link to="/favorites">Favorites</Link>
        </li>
        <li className="p-4 cursor-pointer hover:text-gray-400">Community</li>
        <li className="p-4 cursor-pointer hover:text-gray-400">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
