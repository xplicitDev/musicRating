import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Search from "./components/search";
import Card01 from "./components/card01";
import Card02 from "./components/card02";
import Rankings from "./components/rankings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const App = () => {
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

  // Use motion template to create a dynamic background gradient
  const gradient = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000000 50%, ${color})`;

  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <motion.section className="relative min-h-screen px-16 py-24 text-gray-200 flex flex-col items-center justify-center bg-cover bg-center z-10">
                <div className="absolute inset-0 bg-black opacity-50 z-0" />
                <motion.div
                  style={{ backgroundImage: gradient }}
                  className="absolute inset-0 bg-no-repeat z-0"
                />
                {/* hero-content */}
                <div className="relative z-10 text-center">
                  <h1 className="mt-6 text-6xl sm:text-8xl font-extrabold whitespace-pre-line sm:leading-tight tracking-wide">
                    soundRanked
                  </h1>
                  <p className="mt-2 text-sm sm:text-lg font-light text-gray-400">
                    Rate & Review
                  </p>
                </div>
                <Search />
                <Card01 />
                <Card02 />
              </motion.section>
            }
          />
          {/* Rankings Page */}
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<Favorites />}>
            {" "}
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
