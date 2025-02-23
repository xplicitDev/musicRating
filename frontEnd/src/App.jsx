import { useState } from "react";
import Navbar from "./components/navbar";
import BgGradientAnimated from "./components/bgGradientAnimated";

const App = () => {
  return (
    <main>
      <div className="hero" />
      <Navbar />

      <BgGradientAnimated />
    </main>
  );
};

export default App;
