import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import React, { useEffect } from "react";

// Array of colors to be animated
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function bgGradientAnimated() {
  // Initialize motion value with the first color
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
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section className="relative min-h-screen px-16 py-24 text-gray-200 flex flex-col items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 bg-no-repeat"
      />

      {/* Additional content can be added here */}
      <div className="relative z-10 text-center">
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold whitespace-pre-line sm:leading-tight tracking-wide">
          soundRanked
        </h1>
        <p className="mt-4 text-sm sm:text-lg font-light text-gray-400">
          Rate & Review
        </p>
        <div className="flex justify-center items-center mt-8">
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
    </motion.section>
  );
}

export default bgGradientAnimated;
