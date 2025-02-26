import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import Search from "./components/search";
import BgGradientAnimated from "./components/bgGradientAnimated";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const App = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // Animate the color changes in a loop
    animate(color, COLORS_TOP, {
      ease: "easeInOut", // Easing function for smooth transitions
      duration: 10, // Duration for the entire color transition cycle
      repeat: Infinity, // Repeat the animation infinitely
      repeatType: "mirror", // Reverses the animation direction on each cycle
    });
  }, [color]);

  // Use motion template to create a dynamic background gradient
  const gradient = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000000 50%, ${color})`;

  return (
    <main>
      <Navbar />
      <motion.section className="relative min-h-screen px-16 py-24 text-gray-200 flex flex-col items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50" />
        <motion.div
          style={{ backgroundImage: gradient }}
          className="absolute inset-0 bg-no-repeat"
        />

        {/* hero-content */}
        <div className="relative z-10 text-center">
          <h1 className="mt-6 text-6xl sm:text-8xl font-extrabold whitespace-pre-line sm:leading-tight tracking-wide">
            soundRanked
          </h1>
          <p className="mt-2 text-sm sm:text-lg font-light text-gray-400">
            Rate & Review
          </p>
          <Search />
        </div>
      </motion.section>
    </main>
  );
};

export default App;
