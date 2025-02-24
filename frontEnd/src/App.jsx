import { useState } from "react";
import Navbar from "./components/navbar";
import BgGradient from "./components/bgGradient";
import BgGradientAnimated from "./components/bgGradientAnimated";

const App = () => {
  return (
    <main>
      <Navbar />
      <BgGradientAnimated />
    </main>
  );
};

export default App;
