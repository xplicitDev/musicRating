import React from "react";

const STATIC_COLOR = "#13FFAA";

const bgGradient = () => {
  const backgroundImage = `radial-gradient(125% 125% at 50% 0%, #000000 50%, ${STATIC_COLOR})`;

  return (
    <section style={{ backgroundImage }} className="relative min-h-screen">
      {/* Content can go here */}
    </section>
  );
};

export default bgGradient;
