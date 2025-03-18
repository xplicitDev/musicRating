import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import React, { useEffect } from "react";

const COLORS_TOP = ["#A0FFD9", "#6FBFFF", "#E8B8F0", "#FF6F8C"];

const search = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // Animate the color changes in a loop
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror", // Reverses the animation direction on each cycle
    });
  }, [color]);

  const border = useMotionTemplate`0.01px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 0px 8px ${color}`;

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center gap-2  border border-gray-500/30 rounded-full px-4 py-2 mt-6 bg-gray-900/20 backdrop-blur-lg">
        <div className="flex items-center ">
          <img
            src="./searchIcon.svg"
            alt="search"
            className="absolute ml-1.5 left-2 h-5 w-5"
          />
          <input
            type="text"
            placeholder="Which song deserves 5 stars?"
            className="bg-transparent outline-none text-gray-50 placeholder-gray-400 w-80 ml-6"
          />
        </div>
        <motion.button
          style={{ border, boxShadow }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 text-sm"
        >
          Search
        </motion.button>
      </div>
    </div>
  );
};

export default search;
